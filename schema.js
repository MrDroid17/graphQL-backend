const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');


const customers = [
  {
    id: '1', name: 'Sobhit Kumar', email: 'skumar@gmail.com', age: 28
  },
  {
    id: '2', name: 'John doe', email: 'jhond@gmail.com', age: 35
  },
  {
    id: '3', name: 'Warner bros', email: 'wbros@gmail.com', age: 34
  },
]

// Customer type
const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    age: {type: GraphQLInt}
  })
})


// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields:{
    /***
     * Get customer
     */
    customer: {
      type: CustomerType,
      args: {
        id: {
          type: GraphQLString
        }
      }, 
      resolve(parentValue, args){
        for(let i=0; i< customers.length; i++){
          if(customers[i].id == args.id){
            return customers[i];
          }
        }
      }
    },
    /***
     * Customer list
     */
    customer: {
      type: new GraphQLList(CustomerType), 
      resolve(parentValue, args){
            return customers;
      }
    },

  }

})

module.exports = new GraphQLSchema({
  query: RootQuery
});