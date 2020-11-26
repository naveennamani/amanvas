let all_values_table, all_values_form, saved_data_div;
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
    // let s = `<table id = "all_values" class = "table table-striped table-bordered table-hover table-responsive">`;
    let s = '<thead class = "thead-dark"><tr>'
    for(let table_head_col of table_structure[0]) {
        s += `<th scope = "col">${table_head_col}</th>`;
    }
    s += '</tr></thead>';
    table_structure.forEach(function(row, index) {
        // console.log(row, index);
        if(index == 0) return;
        s += '<tr>';
        for(let col of row) {
            // console.log(typeof(col))
            if(typeof(col)=="string") {
                s += `<td>${col}</td>`;
            } else {
                if(col["type"]=="datetime") {
                    s += '<td style = "width: 200px;"><input type="date" class = "form-control" required/><br/><input type="time" class = "form-control"/></td>'
                } else if(col["type"]=="text") {
                    s += '<td style = "width: 200px;"><input type="text" class = "form-control"/></td>'
                } else {
                    s += '<td style = "width: 200px;"><input type="number" class = "form-control"/></td>'
                }
            }
        }
        s += '</tr>';
    });
    all_values_table.innerHTML = s;
    return s;
}
function save_data(f) {
    // console.log(f);
    let values = [];
    let all_input_fields = all_values_form.querySelectorAll("input");
    let input_element_index = 1;
    table_structure.forEach(function(row, index) {
        values[index] = [];
        row.forEach(function(field, index2) {
            if(typeof(field)=="object") {
                values[index][index2] = all_input_fields[input_element_index++].value;
            }
        });
    });
    console.log(values);
    let all_fields = JSON.parse(localStorage.getItem("all_fields"));
    if(all_fields == null) all_fields = {};
    all_fields[all_input_fields[0].value] = values;
    localStorage.setItem("all_fields", JSON.stringify(all_fields));
    update_saved_data();
    return false;
}
function update_saved_data() {
    let all_fields = JSON.parse(localStorage.getItem("all_fields"));
    let htm = "";
    for(let field_date in all_fields) {
        console.log(field_date);
        htm += `
            <div class = "card">
                <h1 class = "card-header">${field_date}</h1>
                <div class = "card-body">
                    <div class = "btn-group-vertical" role = "group">
                        <button type = "button" class = "btn btn-primary" onclick = "show_data('${field_date}');">Show data</button>
                        <button tpye = "button" class = "btn btn-primary" onclick = "edit_data('${field_date}');">Edit data</button>
                    </div>
                </div>
            </div>
        `;
    }
    saved_data_div.innerHTML = htm;
}
window.onload = function() {
    all_values_table = document.getElementById("all_values");
    all_values_form = document.getElementById("all-values-form");
    saved_data_div = document.getElementById("saved_data");
    gen_table();
    all_values_form.onsubmit = save_data;
    update_saved_data();
};