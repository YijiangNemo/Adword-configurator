import React from 'react';
import CheckBox from '../../components/CheckBox/index';
import './style.css'
import { InputNumber } from 'antd';
import 'antd/dist/antd.css';
import Checkbox from '@material-ui/core/Checkbox'


const update = require('immutability-helper'); //A useful library to Mutate a copy of data without changing the original source

const Settings =(props) => {


  const [state, setState] = React.useState({browserData:props.browserData,
                                                      Incognito:props.Incognito,
                                                        modeData:props.modeData,
                                                        advancedData:props.advancedData,
                                                        timeData:props.timeData
                                                  });

  const BrowserSetting = index => event => {
      const result=update(state,{browserData:{[index]:{checked:{$set:event.target.checked}}}})
      setState(result);
      props.getData(result);
  };
  const ModeSetting = index => event => {
      const result=update(state,{modeData:{[index]:{checked:{$set:event.target.checked}}}})
      setState(result);
      props.getData(result);
  };
  const AdvancedSetting = index => event => {
      const result=update(state,{advancedData:{[index]:{checked:{$set:event.target.checked}}}})
      setState(result);
      props.getData(result);
  };
  const timeSetting =(name,value) => {
      const result=update(state,{timeData:{[name]:{$set:value}}})
      setState(result);
      props.getData(result);
  };



    return(
        <div className={'setting-container'}>
            <div className={'setting-area'}>
                <div style={{display:'flex'}}>
            <div className={'setting-group'} >

                {state.browserData.map((n,i)=>{
                    return(
                         <CheckBox  key={n.title} onChange={BrowserSetting(i)} theme_color={'#feb404'} checked={Boolean(state.browserData[i].checked)} title={n.title}/>
                    )
                })}

            </div>


                <div className={'setting-group'}style={{marginLeft:4}}>
                    <CheckBox theme_color={'#feb404'} onChange={(event)=>{setState({...state,Incognito:event.target.checked});}} checked={Boolean(state.Incognito)}  title={'Incognito'}/>
                </div>
                </div>
            <div style={{marginBottom:30}}  className={'setting-group'}>
                        <span className={'setting-time'}>
                            Wait &nbsp;
                            <InputNumber value={state.timeData.wait_min} onChange={(value)=>timeSetting('wait_min',value)} />
                            <InputNumber value={state.timeData.wait_sec} onChange={(value)=>timeSetting('wait_sec',value)}/>&nbsp;seconds on the targeted website.
                        </span>
                         <span className={'setting-time'}>
                             <Checkbox checked={Boolean(state.timeData.visit_with_site)} onChange={()=>timeSetting('visit_with_site',!Boolean(state.timeData.visit_with_site))}/>
                             Visit the Page within the Site
                         </span>
                         <span className={'setting-time'}>
                             <InputNumber value={state.timeData.page_num} onChange={(value)=>timeSetting('page_num',value)} />&nbsp;
                             pages&nbsp;
                             <InputNumber value={state.timeData.page_min} onChange={(value)=>timeSetting('page_min',value)} />&nbsp;
                             <InputNumber value={state.timeData.page_sec} onChange={(value)=>timeSetting('page_sec',value)} />&nbsp;
                             visit from to second.
                         </span>
                <span className={'setting-time'}>
                    After the operation is complete &nbsp;
                    <InputNumber value={state.timeData.complete_min} onChange={(value)=>timeSetting('complete_min',value)} />&nbsp;
                    if not found times
                    <InputNumber value={state.timeData.complete_sec} onChange={(value)=>timeSetting('complete_sec',value)} />&nbsp;
                    minutes wait.
                </span>
                <span className={'setting-time'}>
                    Target site &nbsp;
                    <InputNumber value={state.timeData.target_site} onChange={(value)=>timeSetting('target_site',value)} />&nbsp;
                    if not found times
                    <InputNumber value={state.timeData.target_min} onChange={(value)=>timeSetting('target_min',value)} />&nbsp;
                    minutes wait.
                </span>
                <span className={'setting-time'}>
                    <InputNumber value={state.timeData.automatic} onChange={(value)=>timeSetting('automatic',value)} />&nbsp;
                    automatic reset after operation.

                </span>
                    </div>
            <div className={'setting-group'} >
                {state.modeData.map((n,i)=>{
                    return(
                         <CheckBox key={n.title} onChange={ModeSetting(i)} theme_color={'#029f43'} checked={Boolean(state.modeData[i].checked)} title={n.title}/>
                    )
                })}
            </div>


            <div  style={{marginBottom:30}} className={'setting-group'} >
                {state.advancedData.map((n,i)=>{
                    return(
                         <CheckBox key={n.title} onChange={AdvancedSetting(i)} theme_color={'#007bf8'} checked={Boolean(state.advancedData[i].checked)} title={n.title}/>
                    )
                })}
            </div>

            </div>

        </div>
)}
;

export default Settings

