import React from 'react';
import Configurator from './modules/Configurator'
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';


const get_data = gql`
  query($id:Int) {
    Configurator(id:$id){
        id
      timeSetting{
        Incognito
        modeData{
          title
          checked
        }
        browserData{
          title
          checked
        }
        advancedData{
          title
          checked
        }
        timeData{
        wait_min
        wait_sec
        visit_with_site
        page_num
        page_min
        page_sec
        complete_min
        complete_sec
        target_site
        target_min
        automatic
        }
      }
        keywords
        sites
     }
  }`
class ConfiguratorPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {

    }

    render() {

    return (
         <Query query={get_data} variables={{id:parseInt(this.props.match.params.id)}}>
             {({loading, error, data}) => {

                 if (loading) return <div>Loading...</div>;
                 if (error) return <div>Error :(</div>;

                 return(<Configurator onStart={settings=>{console.log(settings)}} onExport={settings=>{console.log(settings)}} onStop={()=>{console.log('stop')}} settings={data.Configurator[0]}/>)
                }
             }
         </Query>
         )
  }
}

export default ConfiguratorPage;