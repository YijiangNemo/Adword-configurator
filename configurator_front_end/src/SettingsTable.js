import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from './components/Button/index';
import Paper from '@material-ui/core/Paper';
import { gql } from 'apollo-boost';
import { Query ,Mutation} from 'react-apollo';

const get_data = gql`
  query {
    Configurator{
        id
        createdAt
        updatedAt       
    }
  }`
const add_data = gql`
 mutation{	
  create(data:{
   				 keywords:[]
    				sites:[]
             timeSetting:{
             Incognito:false,
                modeData:[{title:"Device Reset",checked:false},{title:"Vinn Reset",checked:false},{title:"Phone Reset",checked:false},{title:"Mobile Data",checked:false},{title:"Fly Mode",checked:false}],
                browserData:[{title:"Chrome",checked:false},{title:"Firefox",checked:false},{title:"Explorer",checked:false},{title:"Safari",checked:false},{title:"Opera",checked:false}],
                advancedData:[{title:"Remove Cookies",checked:false},{title:"Change Resolution",checked:false},{title:"Mouse Tracks",checked:false},{title:"Data Saving Mode",checked:false},{title:"Random Generate",checked:false}
                                ,{title:"Analytics Protection",checked:false},{title:"Remove History",checked:false}],
                timeData:{wait_min:0,wait_sec:0,visit_with_site:false,page_num:0,page_min:0,page_sec:0,complete_min:0,complete_sec:0,target_site:0,target_min:0,automatic:0}      
          }
  
  }){
      
     		id
      timeSetting{
        Incognito
        modeData{
          title
        }
      }
        keywords
        sites
        createdAt
        updatedAt
     }
}`

class SettingsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

    return (

        <Paper >
            <Mutation mutation={add_data}>

       {(addTodo, { loading, error, data }) => {
        console.log({ loading, error, data })
           if (loading) return <div>Loading...</div>;
              if (error) return <div>Error :(</div>;
           if(data) {
               window.location.pathname = `configurator/${data.create.id}`
           }
        const handleFileUpload = ({ target }) => {
                addTodo(add_data)
        }
        return (
          <div>
              <Button onClick={(target) => handleFileUpload(target)}>Add New</Button>

          </div>
        )
      }}
    </Mutation>

      <Table >
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell >Create At</TableCell>
            <TableCell >Update At</TableCell>

            <TableCell >Operation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <Query query={get_data}>
            {({ loading, error, data }) => {
                console.log({ loading, error, data })
              if (loading) return <div>Loading...</div>;
              if (error) return <div>Error :(</div>;
                return data.Configurator.map(n=>{
                    return(
                         <TableRow key={n.id}>
                      <TableCell component="th" scope="row">
                        {n.id}
                      </TableCell>

                      <TableCell >{new Date(parseInt(n.createdAt) ).toJSON()}</TableCell>
                            <TableCell >{new Date(parseInt(n.updatedAt) ).toJSON()}</TableCell>
                        <TableCell ><Button onClick={()=>{window.location.pathname=`/configurator/${n.id}`}} backgroundcolor={'#007bf8'}>EDIT</Button></TableCell>
                    </TableRow>
                    )
                })

            }}
          </Query>

        </TableBody>
      </Table> </Paper>)
  }
}

export default SettingsTable;