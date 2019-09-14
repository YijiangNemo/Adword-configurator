var UserInputError = require('apollo-server').UserInputError ;
var sql_OP = require('../controllers/sqlController');
var graphql = require('graphql');

var timeData = new graphql.GraphQLObjectType({
    name: 'timeData',
    fields: {
        wait_min:{ type: graphql.GraphQLInt },
        wait_sec:{ type: graphql.GraphQLInt },
        visit_with_site:{ type: graphql.GraphQLBoolean },
        page_num:{ type: graphql.GraphQLInt },
        page_min:{ type: graphql.GraphQLInt },
        page_sec:{ type: graphql.GraphQLInt },
        complete_min:{ type: graphql.GraphQLInt },
        complete_sec:{ type: graphql.GraphQLInt },
        target_site:{ type: graphql.GraphQLInt },
        target_min:{ type: graphql.GraphQLInt },
        automatic:{ type: graphql.GraphQLInt },

    }
});
var browserData = new graphql.GraphQLObjectType({
    name: 'browserData',
    fields: {
        title: { type: graphql.GraphQLString },
        checked: { type: graphql.GraphQLBoolean },
    }
});
var advancedData = new graphql.GraphQLObjectType({
    name: 'advancedData',
    fields: {
        title: { type: graphql.GraphQLString },
        checked: { type: graphql.GraphQLBoolean },
    }
});
var modeData = new graphql.GraphQLObjectType({
    name: 'modeData',
    fields: {
        title: { type: graphql.GraphQLString },
        checked: { type: graphql.GraphQLBoolean },
    }
});
var timeSetting = new graphql.GraphQLObjectType({
    name: 'timeSetting',
    fields: {
        Incognito: { type: graphql.GraphQLBoolean },
        modeData:{ type: graphql.GraphQLList(modeData) },
        browserData:{ type: graphql.GraphQLList(browserData) },
        advancedData:{ type: graphql.GraphQLList(advancedData)},
        timeData:{ type: timeData},
    }
});


var Configurator = new graphql.GraphQLObjectType({
    name: 'Configurator',
    fields: {
        id: { type: graphql.GraphQLInt },
        timeSetting:{ type: timeSetting },
        keywords: { type: graphql.GraphQLList(graphql.GraphQLString) },
        sites: { type: graphql.GraphQLList(graphql.GraphQLString) },
        createdAt: { type: graphql.GraphQLString },
        updatedAt: { type: graphql.GraphQLString },
    }
});
var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        Configurator:{
            type:  graphql.GraphQLList(Configurator),
            args: {
                id: { type: graphql.GraphQLInt }
            },
            resolve: function (_, {id}) {
                return sql_OP.findbyId(id).then(res=>{
                    return res.data
                }).catch(e=>{
                    throw new UserInputError(e.msg)
                })
            }
        }

    }
})
var timeDataInput = new graphql.GraphQLInputObjectType({
    name: 'timeDataInput',
    fields: {
        wait_min:{ type: graphql.GraphQLInt },
        wait_sec:{ type: graphql.GraphQLInt },
        visit_with_site:{ type: graphql.GraphQLBoolean },
        page_num:{ type: graphql.GraphQLInt },
        page_min:{ type: graphql.GraphQLInt },
        page_sec:{ type: graphql.GraphQLInt },
        complete_min:{ type: graphql.GraphQLInt },
        complete_sec:{ type: graphql.GraphQLInt },
        target_site:{ type: graphql.GraphQLInt },
        target_min:{ type: graphql.GraphQLInt },
        automatic:{ type: graphql.GraphQLInt },

    }
});
var browserDataInput = new graphql.GraphQLInputObjectType({
    name: 'browserDataInput',
    fields: {
        title: { type: graphql.GraphQLString },
        checked: { type: graphql.GraphQLBoolean },
    }
});
var advancedDataInput = new graphql.GraphQLInputObjectType({
    name: 'advancedDataInput',
    fields: {
        title: { type: graphql.GraphQLString },
        checked: { type: graphql.GraphQLBoolean },
    }
});
var modeDataInput = new graphql.GraphQLInputObjectType({
    name: 'modeDataInput',
    fields: {
        title: { type: graphql.GraphQLString },
        checked: { type: graphql.GraphQLBoolean },
    }
});
var timeSettingInput = new graphql.GraphQLInputObjectType({
    name: 'timeSettingInput',
    fields: {
        Incognito: { type: graphql.GraphQLBoolean },
        modeData:{ type: graphql.GraphQLList(modeDataInput) },
        browserData:{ type: graphql.GraphQLList(browserDataInput) },
        advancedData:{ type: graphql.GraphQLList(advancedDataInput)},
        timeData:{ type: timeDataInput},
    }
});
var dataInput = new graphql.GraphQLInputObjectType({
    name: 'dataInput',
    fields: {
        keywords: { type: graphql.GraphQLList(graphql.GraphQLString) },
        sites: { type: graphql.GraphQLList(graphql.GraphQLString) },
        timeSetting:{ type: timeSettingInput },
    }
});
var mutationType = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        create:{
            type: Configurator ,
            args: {
                data: {type: dataInput}
            },
            resolve: function (_, data) {
                return sql_OP.addSettings(data.data).then(res=>{

                    return res.data
                }).catch(e=>{
                    throw new UserInputError(e.msg)
                })
            }
        },
        update:{
            type: Configurator ,
            args: {
                id:{type: graphql.GraphQLInt},
                data: {type: dataInput}
            },
            resolve: function (_, {id,data}) {
                console.log({id,data})
                return sql_OP.updateSettings(id,data).then(res=>{
                    return res.data
                    console.log(res)
                }).catch(e=>{

                    throw new UserInputError(e.msg)

                })
            }
        }


    }
})
var schema = new graphql.GraphQLSchema({query: queryType,mutation:mutationType});

module.exports= schema;
