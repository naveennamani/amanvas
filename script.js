let t = document.getElementById("all_values");
let table_structure = [
    ["Field", "Normal", "&nbsp", "TOD KWH", "TOD KVAH", "TOD MD"],
    ["KWH", {"type": "text"}, "T1", {"type": "text"}, {"type": "text"}, {"type": "text"}],
    ["Lag", {"type": "text"}, "T2", {"type": "text"}, {"type": "text"}, {"type": "text"}],
    ["Lead", {"type": "text"}, "T3", {"type": "text"}, {"type": "text"}, {"type": "text"}],
    ["KVAH", {"type": "text"}, "T4", {"type": "text"}, {"type": "text"}, {"type": "text"}],
    ["MD", {"type": "text"}, "T5", {"type": "text"}, {"type": "text"}, {"type": "text"}],
    ["DATE/TIME", {"type": "datetime"}, "T6", {"type": "text"}, {"type": "text"}, {"type": "text"}],
    ["RESET/CMD", {"type": "text"}, {"type": "text"}, {"type": "text"}, {"type": "text"}, {"type": "text"}],
    ["Voltages", {"type": "text"}, {"type": "text"}, {"type": "text"}, {"type": "text"}, {"type": "text"}],
    ["Currents", {"type": "text"}, {"type": "text"}, {"type": "text"}, {"type": "text"}, {"type": "text"}],
    ["Seals", {"type": "text"}, {"type": "text"}, {"type": "text"}, {"type": "text"}, {"type": "text"}],
];
function gen_table() {
    let s = `<table id = "all_values" class = "table table-striped table-bordered table-hover table-responsive">`;
    s += '<thead class = "thead-dark"><tr>'
    for(let table_head_col of table_structure[0]) {
        s += `<th scope = "col">${table_head_col}</th>`;
    }
    s += '</tr></thead>';
    table_structure.forEach(function(row, index) {
        // console.log(row, index);
        if(index == 0) return;
        s += '<tr>';
        for(let col of row) {
            console.log(typeof(col))
            if(typeof(col)=="string") {
                s += `<td>${col}</td>`;
            } else {
                if(col["type"]=="datetime") {
                    s += '<td style = "width: 200px;"><input type="date" class = "form-control"/><br/><input type="time" class = "form-control"/></td>'
                } else if(col["type"]=="text") {
                    s += '<td style = "width: 200px;"><input type="text" class = "form-control"/></td>'
                } else {
                    s += '<td style = "width: 200px;"><input type="number" class = "form-control"/></td>'
                }
            }
        }
        s += '</tr>';
    });
    return s;
}
window.onload = function() {
    let d = document.createElement("div");
    d.innerHTML = gen_table();
    document.body.appendChild(d);
};