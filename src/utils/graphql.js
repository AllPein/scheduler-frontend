import gql from 'graphql-tag';

//QUERIES
const GET_USER = gql`
    query getMe {
        me {
            username
            email
            
        }
    }
`;
const GET_TOKEN = gql`
  query getToken($email: String!, $password: String!){
    getToken(email: $email, password: $password) {
        user {
            username
            email
        }
        token
    }
  }
`;
const GET_TASKS = gql`
    query getTasks($collection: String!){
        getTasks(collection: $collection) {
            title
            id
            description
            done
            deadline
            favorite
        }
    }
`
const GET_COLLECTIONS = gql`
    query getCollections{
      getCollections {
            id
            favorite
            completed
            count
            title
        }
    }
`


//MUTATIONS
const CREATE_USER = gql`
  mutation createUser($email: String!, $username: String!, $password: String!){
    createUser(email: $email, username: $username, password: $password) {
        user {
            username
            email
        }
        token
    }
  }
`;

const ADD_TASK = gql`
  mutation addTask($title: String!, $deadline: String!, $description: String!, $collection: String!){
    addTask(input: { title: $title, deadline: $deadline, description: $description, collection: $collection }) {
        title
        description
        deadline
    }
  }
`;
const ADD_COLLECTION = gql`
  mutation addCollection($title: String!){
    addCollection(input: { title: $title }) {
        title
    }
  }
`;
const REMOVE_COLLECTION = gql`
  mutation removeCollection($id: ID!){
    removeCollection(id: $id ) 
  }
`;
const UPDATE_COLLECTION = gql`, 
  mutation updateCollection($title:String!, $favorite: Boolean, $id: ID!){
    updateCollection(input: { title: $title, favorite: $favorite }, id: $id) {
        title
        favorite
    }
  }
`;
const UPDATE_TASK = gql`, 
  mutation updateTask($title:String!, $id: ID!, $favorite: Boolean!, $done: Boolean!){
    updateTask(input: { favorite: $favorite, title: $title, done: $done }, id: $id) {
        title
        favorite
    }
  }
`;


export { CREATE_USER, GET_TOKEN, GET_USER, GET_TASKS, ADD_TASK, ADD_COLLECTION, GET_COLLECTIONS, UPDATE_COLLECTION, UPDATE_TASK, REMOVE_COLLECTION };