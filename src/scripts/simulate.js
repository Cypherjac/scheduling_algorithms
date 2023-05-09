const FCFS = require("../algorithms/first_come_first_serve");
const SJF = require("../algorithms/shortest_job_first");
const SRTN = require("../algorithms/shortest_remaining_time_next");
const RR = require("../algorithms/round_robin");

let _fcfs = new FCFS()
let _sjf = new SJF()
let _srtn = new SRTN()
let _rr = new RR()

class Simulate
{
    breakdown = (data) => {
        data = JSON.parse(JSON.stringify(data))
        let time = 0
        const min_arrival_time = () => {
            var entry_list = [], min, l = JSON.parse(JSON.stringify(data.processes))
            l.forEach(proc => entry_list.push(Number(proc.arrival_time)))
            min = entry_list[0]
            for(var i = 0; i < entry_list.length-1; i++){
                min = entry_list[i+1] < min ? entry_list[i+1] : min
            }
            return min
        }
        data.processes.forEach(proc => { time += Number(proc.burst_time) })
        time += min_arrival_time()
        this.gantt = (b) => {
            const find_executing_process = (prev, current) => {
                let prev_list = {}, current_list = {}, process_list = [], executing = null
                prev.forEach(proc => {
                    prev_list[proc.process] = proc.executed
                })
                current.forEach(proc => {
                    current_list[proc.process] = proc.executed
                    process_list.push(proc.process)
                })
                for(var p = 0; p < process_list.length; p++){
                    if(current_list[process_list[p]] != prev_list[process_list[p]]){
                        executing = process_list[p]
                    }
                }
                return executing
            }
            var gantt_value
            let max = time
            let min = min_arrival_time()+1
            gantt_value = b[0].processes_state.length == 1 ? b[0].processes_state[0].process : b[min].processes_queue[0].process
            let gantt_chart = []
            let gantt_position = 0
            for(var g = min; g <= max; g++){
                let current = find_executing_process(
                    b[g-1].processes_state,
                    b[g].processes_state
                )
                if(current != gantt_value){
                    gantt_chart.push(
                        {
                            process_name: gantt_value,
                            count: g-1,
                            position: gantt_position
                        }
                    )
                    gantt_value = current
                    gantt_position++
                }
                if(g == (max)){
                    gantt_chart.push(
                        {
                            process_name: current,
                            count: g,
                            position: gantt_position
                        }
                    )
                }
                gantt_value = current
            }
            return {
                min_value: min_arrival_time(),
                chart: gantt_chart
            }
        }
        this.sjf = () => {
            let breakdown = {}
            for(var t = 0; t <= time; t++){
                breakdown[t] = _sjf.run(t, data)
            }
            return {
                breakdown: JSON.stringify(breakdown),
                gantt: this.gantt(breakdown)
            }
        }
        this.fcfs = () => {
            let breakdown = {}
            for(var t = 0; t <= time; t++){
                breakdown[t] = _fcfs.run(t, data)
            }
            return {
                breakdown: JSON.stringify(breakdown),
                gantt: this.gantt(breakdown)
            }
        }
        this.srtn = () => {
            let breakdown = {}
            for(var t = 0; t <= time; t++){
                breakdown[t] = _srtn.run(t, data)
            }
            return {
                breakdown: JSON.stringify(breakdown),
                gantt: this.gantt(breakdown)
            }
        }
        this.rr = (rr=2) => {
            let breakdown = {}
            for(var t = 0; t <= time; t++){
                breakdown[t] = _rr.run(t, data, rr)
            }
            return {
                breakdown: JSON.stringify(breakdown),
                gantt: this.gantt(breakdown)
            }
        }
        return this
    }
}
module.exports = Simulate

// let data = 
// {
//     time_unit: "ms",
//     processes: [
//         {
//             process: "P1",
//             burst_time: 1,
//             arrival_time: 4
//         }
//     ]
// }

// let sim = new Simulate()
// console.log(JSON.stringify(sim.breakdown(data).srtn().gantt))