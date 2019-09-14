import React,{Component} from 'react';
import List from '../views/List/index'
import PropTypes from "prop-types";
import './Configurator.css'
import Settings from "../views/Setting";
import Button from "../components/Button/index";
import {gql} from "apollo-boost";
import { Mutation} from 'react-apollo';


const add_data = gql`
             mutation($id:Int,$data:dataInput){	
              update(id:$id,data:$data){
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
class Configurator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alertD:false,
            alertMsg:'',
            ...this.props.settings
        }
    }

    handleStop=()=>{
        this.props.onStop()
    }
    handleStart=()=>{
        this.props.onStart(this.state)
    }
    handleExport=()=>{
        this.props.onExport(this.state)
    }

    handleClose=()=>{
        this.setState({alertD:false})
    }

    render() {
        console.log({keywords:this.state.keywords,timeSetting:this.state.timeSetting,sites:this.state.sites})
        return (
            <div className={'container'}>

                <div className={'col-3'}>
                    <span className={'list-title'}>

                        <i style={{color:'#007bf8'}} className="material-icons">label</i>
                         <h2>
                            Keywords
                        </h2>
                    </span>
                <List getData={(data)=>{this.setState({keywords:data})}} placeholder={'Enter your keywords here(shoes)'} buttonColor={'#007bf8'} data={this.state.keywords} />
                </div>
                <div className={'col-3'}>
                    <span className={'list-title'}>

                        <i style={{color:'#029f43'}}className="material-icons">computer</i>
                         <h2>
                            Sites
                        </h2>
                    </span>
                <List getData={(data)=>{this.setState({sites:data})}} placeholder={'Enter your site here'} buttonColor={'#029f43'} data={this.state.sites}  />
                </div>
                <div className={'col-6'}>
                    <span className={'list-title'}>

                        <i style={{color:'#feb404'}} className="material-icons">settings_applications</i>
                         <h2>
                            Settings
                        </h2>
                    </span>
                    <Settings Incognito={this.state.timeSetting.Incognito} getData={(data)=>{this.setState({timeSetting:data})}} modeData={this.state.timeSetting.modeData}
                              browserData={this.state.timeSetting.browserData}
                                advancedData={this.state.timeSetting.advancedData}
                             timeData={this.state.timeSetting.timeData}/>
                <div className={'button-group'}>
                        <Mutation mutation={add_data} variables={{id:parseInt (this.state.id),data:{keywords:this.state.keywords,timeSetting:this.state.timeSetting,sites:this.state.sites}}}>

       {(addTodo, { loading, error, data }) => {
        console.log({ loading, error, data })
           if (loading) return <div>Loading...</div>;
           if (error) return <div>Error :(</div>;

        const handleFileUpload = ({ target }) => {
                addTodo(add_data)
        }
        return (
            <span className={'config-button'}>
                    <Button  onClick={(target) => handleFileUpload(target)} backgroundcolor={'#4464fe'}><i className="material-icons">save</i>SAVE</Button>
                    </span>

        )
      }}
    </Mutation>

                    <span className={'config-button'}>
                    <Button onClick={this.handleExport} backgroundcolor={'#feb404'}><i className="material-icons">import_export</i>EXPORT REPORT</Button>
                    </span>
                    <span className={'config-button'}>
                    <Button onClick={this.handleStop} backgroundcolor={'#007bf8'}><i  className="material-icons">pause</i>STOP</Button>
                    </span>
                    <span className={'config-button'}>
                    <Button onClick={this.handleStart} backgroundcolor={'#029f43'}><i  className="material-icons">play_arrow</i>START</Button>
                    </span>
                </div>
                </div>

            </div>
        );
    }

}

Configurator.propTypes = {
  onStart: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
  onExport: PropTypes.func.isRequired,
    settings:PropTypes.object.isRequired,
};

export default Configurator;
