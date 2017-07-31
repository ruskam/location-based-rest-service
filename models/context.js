var mongoose = require('mongoose');
var ContextSchema = mongoose.Schema;

var contextSchema = new ContextSchema({
    context: {
        type: String,
        required: true
    },
    location: {
        type: [Number],
        index: '2d'
    }
});
contextSchema.index({ location: '2dsphere' });
var Context = mongoose.model('Context', contextSchema);
//var Context = module.exports = mongoose.model('Context', contextSchema);
module.exports = Context;

module.exports.getContexts = function(callback, limit) {
    Context.find(callback).limit(limit);
};

module.exports.getContextById = function(id, callback){
	Context.findById(id, callback);
};

module.exports.getContextsNear = function(lng, lat, distance, callback){
    var query = {
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [lng, lat]
                },
                $maxDistance: distance
            }
        }
    };
    Context.find(query, callback);
};
