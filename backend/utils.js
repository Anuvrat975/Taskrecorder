module.exports.setUnamefunc = (unm) => {
    if(!unm) return 'def.0'// this line is to avoid error when no username is set, def.0 will be the default collection name
    return unm
}
