function verifyCheckBox(chkList, field) {
    $.each(chkList, function (index, elem) {
        if (!field.hasOwnProperty(elem.id)) {
            field[elem.id] = 0;
            //field[elem.id] = $('#' + elem.id).val();
        }
    })
}

Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val)
            return i;
    }
    return -1;
};

Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1)
        this.splice(index, 1);
}
