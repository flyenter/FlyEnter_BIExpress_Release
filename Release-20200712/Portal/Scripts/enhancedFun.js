function getIDList(grid, colName) {
    var lst = new Array();
    if (grid != null) {
        for (var i = 0; i < grid.data.Count; i++) {
            if (grid.data[colName] != null && grid.data[colName] != '')
                lst.push(grid.data[colName]);
        }
    }
    return lst;
}