class ROUNDROBIN
{
    // FIXME: ADD Step for cpu execution time, e.g +0.1, +0.5 instead of just +1
    state
    processes_queue
    processes_state
    out_queue
    execute = (a, time, rr, stack) => {
        var queue = a, cpu_exec_time = 0, status = "running", active_time = 0, overall_time, round_time = rr
        const min_arrival_time = () => {
            var entry_list = [], min, l = JSON.parse(JSON.stringify(a))
            l.forEach(proc => entry_list.push(Number(proc.arrival_time)))
            min = entry_list[0]
            for(var i = 0; i < entry_list.length-1; i++){
                min = entry_list[i+1] < min ? entry_list[i+1] : min
            }
            return min
        }
        a.forEach(proc => { active_time += proc.burst_time })
        active_time += min_arrival_time()
        time = time === -1 ? active_time : time
        overall_time = time
        time = time > active_time ? active_time : time
        const array_search = (needle, haystack) => {
            let search = false
            if(haystack.length > 0){
                for(var i = 0; i < haystack.length; i++){
                    if(haystack[i] === needle){
                        search = true
                        break
                    } else search = false
                }
            }
            return search
        }
        const update_stack = () => {
            queue.forEach(proc => {
                let stack_process = stack.find(stack_proc => stack_proc.process === proc.process)
                stack_process.executed = proc.executed
                stack_process.remaining_time = proc.remaining_time
                stack_process.initial_entry = proc.initial_entry
                stack_process.completion_time = proc.completion_time
                stack_process.status = proc.status
            })
        }
        const unqueue_process = (queue) => {
            queue[0].completion_time = cpu_exec_time+1
            queue[0].status = "terminated"
            status = `process ${queue[0].process} completed`
            !array_search(queue[0].process, this.out_queue) ? this.out_queue.unshift(queue[0].process) : ''
            update_stack()
            queue.shift()
        }
        const execute_process = (queue) => {
            if(queue.length > 0){
                round_time -= 1
                status = `processing ${queue[0].process}`
                queue[0].status = "running"
                queue[0].remaining_time -= 1
                queue[0].executed += 1
                queue[0].initial_entry == -1 ?
                    queue[0].initial_entry = cpu_exec_time
                : ''
                queue[0].remaining_time == 0 ? (
                    unqueue_process(queue),
                    reset_rr()
                ): status = `processing ${queue[0].process}`
                update_stack()
            }
        }
        const queue_init = (time) => {
            let base_queue = JSON.parse(JSON.stringify(a)), queue_list = [], in_queue_list = [], relative_queue = [], in_queue = base_queue
            if(time == "init"){
                base_queue.forEach(proc => {
                    if(proc.arrival_time == 0){
                        relative_queue.push(proc)
                    }
                })
            }
            else {
                queue.forEach(proc => {
                    proc.arrival_time == time ?
                        queue_list.push(proc.process)
                    : ''
                })
                in_queue.forEach(proc => {
                    proc.arrival_time == 0 ?
                        in_queue_list.push(proc.process)
                    : ''
                })
                relative_queue = queue
                let c
                for(c = 0; c < base_queue.length; c++){
                    if(base_queue[c].arrival_time == time){
                        if(!array_search(base_queue[c].process, queue_list)){
                            if(!array_search(base_queue[c].process, in_queue_list) && !array_search(base_queue[c].process, this.out_queue)){
                                relative_queue.push(base_queue[c])
                            }
                        }
                    }
                }
            }
            queue = relative_queue
        }
        const reset_rr = () => { round_time = rr }
        queue_init("init")
        this.processes_queue = queue
        for(var available = time; available > 0; available--){
            if(queue.length > 0){
                if(round_time > 0){
                    if(queue[0].remaining_time > 0){
                        execute_process(queue)
                    }
                }
                else {
                    if(queue[0].remaining_time > 0){
                        queue.push(queue.shift());
                        reset_rr()
                        queue[0].status = "ready"
                        execute_process(queue)
                    }
                }
            }
            cpu_exec_time += 1
            queue_init(cpu_exec_time)
            this.processes_queue = Object.values(queue)
        } this.processes_state = Object.values(stack)
        this.state = {
            status: status,
            cpu_idle: overall_time-cpu_exec_time,
            expected_active_time: active_time,
            actual_active_time: cpu_exec_time,
        }
    }
    analysis = (data) => {
        data.processes_state.forEach(proc => proc.turnaround_time = proc.completion_time - proc.arrival_time)
        data.processes_state.forEach(proc => proc.waiting_time = proc.turnaround_time - proc.burst_time)
        this.average_turnaround_time = () => {
            let total_turnaround_time = 0, average, computation = {}
            data.processes_state.forEach(proc => {
                computation[proc.process] = `${proc.completion_time} - ${proc.arrival_time} = ${proc.completion_time - proc.arrival_time}`
                total_turnaround_time += proc.turnaround_time
            })
            average = total_turnaround_time/data.processes_state.length
            return {
                computation: computation,
                average: average
            }
        }
        this.average_waiting_time = () => {
            let total_waiting_time = 0, average, computation = {}
            data.processes_state.forEach(proc => {
                computation[proc.process] = `${proc.turnaround_time} - ${proc.burst_time} = ${proc.turnaround_time - proc.burst_time}`
                total_waiting_time += proc.waiting_time
            })
            average = total_waiting_time/data.processes_state.length
            return {
                computation: computation,
                average: average
            }
        }
        return this;
    }
    logic = (time, data, rr) => {
        let s = data.processes.sort(
            function(a, b){
                return a.arrival_time - b.arrival_time
            }
        );
        s.forEach(process => {
                process.executed = 0
                process.remaining_time = process.burst_time
                process.initial_entry = -1
                process.completion_time = -1
                process.status = "ready"
            }
        )
        let stack_deep_copy = JSON.stringify(s)
        this.execute(s, time, rr, JSON.parse(stack_deep_copy))
    }
    run = (time, data, rr) => {
        this.state = {}
        this.processes_queue = []
        this.processes_state = []
        this.out_queue = []
        this.logic(time, data, rr)
        return {
            state: this.state,
            processes_state: this.processes_state,
            processes_queue: this.processes_queue,
            out_queue: this.out_queue,
        }
    }
}
module.exports = ROUNDROBIN
