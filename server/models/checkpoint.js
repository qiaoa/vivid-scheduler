module.exports = mongoose.model('Checkpoint', {
    pname : {type : String, default: ''},
    cname : {type : String, default: ''},
    cdate : {type : Date, default: new Date()},
    });