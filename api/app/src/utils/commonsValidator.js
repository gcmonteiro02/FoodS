/**
* Function that verify if some attribute is null
* @param {Object} attr
*/
module.exports.isNull = (attr) => {
    return attr == undefined || attr == '' || attr == null;
};
