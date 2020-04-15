import gql from 'graphql-tag';

//QUERIES
const GET_USER = gql`
    query getMe {
        me {
            username
            email
            collections {
                title
                count
                completed
            }
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
            description
            done
            deadline
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


export { CREATE_USER, GET_TOKEN, GET_USER, GET_TASKS, ADD_TASK, ADD_COLLECTION };