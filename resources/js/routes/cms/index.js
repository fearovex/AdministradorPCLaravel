import React, { Component } from "react";
// import {
//    LiveProvider,
//    LiveEditor,
//    LiveError,
//    LivePreview
//  } from 'react-live';
//  import { RctCardContent } from 'Components/RctCard';
import renderHTML from 'react-render-html';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import FormGroupUI from '@material-ui/core/FormGroup';
import FormControlLabelUI from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ButtonUI from '@material-ui/core/Button';
import { RctCardContent } from 'Components/RctCard';

import Dropzone from 'react-dropzone'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	FormText,
	Col,
	FormFeedback
} from 'reactstrap';


import '../cms/formStyles.css';
import '../cms/styles.css';

import axios, { post } from 'axios'


// import Radium, { Style } from 'radium'

function TabContainer({ children, dir }) {
   return (
      <Typography component="div" dir={dir} style={{ padding: 8 * 3, overflowX: 'hidden' }}>
         {children}
      </Typography>
   );
}

export default class CMS extends Component {
   constructor(props){
      super(props)
      this.onDrop = (filesBanner) => {
         if(filesBanner.length > 5){
             NotificationManager.error('Ha excedido el número de imagenes (Max 5)','',5000);
          }else{
             this.setState({
                form:{
                   ...this.state.form,
                   filesBanner
                }
             })
          }
      }
      this.formCampaing = this.props.location.state.form;
      this.state = {
         data: [],
         value:0,
         valueLang:0,
         valueViewsFormat:0,
         checkedB: true,
         form:{
            //campaña
            id_location: this.formCampaing.id_location,
            nombre_campaña: this.formCampaing.nombre_campaña,
				fecha_inicio: this.formCampaing.fecha_inicio,
				fecha_fin: this.formCampaing.fecha_fin,
            descripcion: this.formCampaing.descripcion,
            vertical_economica: this.formCampaing.vertical_economica,
				zona_ap: this.formCampaing.zona_ap,
				anio: this.formCampaing.anio,
            //formulario
            email:true,
            nombre:false,
            apellidos:false,
            edad:false,
            genero:false,
            telefono:false,
            num_voucher:false,
            num_habitacion:false,
            razon_visita:false,
            terminos_condiciones_esp:"",
            terminos_condiciones_eng:"",
            //diseño
            titlePortal:"",
            fileBackground:"",
            fileLogo:"",
            sizeLogoMobile:"",
            sizeLogoWeb:"",
            buttonColors:"",
            backgroundColorForm:"",
            colorTitleForm:"#000",
            colorFontForm:"",
            filesBanner: [],
            imgsBannerSwitch:true,
            imgBackgroundPreviewUrl:null
         },
      }
      this.handleChangeCheckBox = this.handleChangeCheckBox.bind(this)
      this.rteChangeEsp = this.rteChangeEsp.bind(this);
      this.rteChangeEng = this.rteChangeEng.bind(this);

      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
   }

   async componentDidMount(){

   }
   handleChangeTabs = (event, value) => {
      this.setState({ value });
   };

   handleChangeTabsIndex = index => {
      this.setState({ value: index });
   };
   //tabs lang
   handleChangeTabsLang = (event, valueLang) => {
      this.setState({ valueLang });
   };

   handleChangeTabsIndexLang = index => {
      this.setState({ valueLang: index });
   };

   handleChangeTabsViewsFormat = (event, valueViewsFormat) => {
      this.setState({ valueViewsFormat });
   };

   handleChangeTabsIndexViewsFormat = index => {
      this.setState({ valueViewsFormat: index });
   };

   

   //métodos formulario
   handleChangeCheckBox = name => event => {
      if(name == 'email'){
         if(!this.state.form.num_voucher){
            this.setState({
               form:{
                  ...this.state.form,
                  email: true,
               }
            });
         }
         else{
            this.setState({
               form:{
                  ...this.state.form,
                  email: event.target.checked,
               }
            });
         }
      }
      else if(name == 'num_voucher'){
         if(!this.state.form.email){
            this.setState({
               form:{
                  ...this.state.form,
                  num_voucher: true,
               }
            });
         }else{
            this.setState({
               form:{
                  ...this.state.form,
                  num_voucher: event.target.checked,
               }
            });
         }
         
      }
      else if(name == 'nombre'){
         if(event.target.checked != false){
            this.setState({
               form:{
                  ...this.state.form,
                  nombre: event.target.checked,
                  apellidos: true 
               }
            });
         }
         else{
            this.setState({
               form:{
                  ...this.state.form,
                  nombre: event.target.checked,
                  apellidos: false 
               }
            });
         }
      }else{
         this.setState({
            form:{
               ...this.state.form,
               [name]: event.target.checked 
            }
         });
      }
      
   };
   handleSwitch = name => event => {
      this.setState({
            [name]: event.target.checked 
      });
   };

   rteChangeEsp = (content, delta, source, editor) => {
		// console.log(editor.getHTML()); // texto html
      // console.log(editor.getText()); // texto plano
      this.setState({
         form:{
            ...this.state.form,
            terminos_condiciones_esp: editor.getHTML()
         }
        
      })
		// console.log(editor.getLength()); // número de carácteres
   }
   rteChangeEng = (content, delta, source, editor) => {
      this.setState({
         form:{
            ...this.state.form,
            terminos_condiciones_eng: editor.getHTML()
         }
        
      })
   }
   //fin métodos formulario

   //métodos diseño 
   async handleChange(e){
      if(e.target.name == 'fileBackground'){
         if(e.target.files[0].size >= 500000 ){
            NotificationManager.error('El archivo excedió el tamaño límite','',5000);
            this.setState({
               form:{
                  ...this.state.form,
                  fileBackground:""
               }
            })

         }
         else if(!((e.target.files[0].type).includes("image/"))){
            NotificationManager.error('El tipo de archivo no es valido','',5000);
            this.setState({
               form:{
                  ...this.state.form,
                  fileBackground:""
               }
            })
         }
         else{
            let files = e.target.files;
            let reader = new FileReader();
            reader.readAsDataURL(files[0])
            
            reader.onload=(e)=>{
               this.setState({
                  form:{
                     ...this.state.form,
                     fileBackground:e.target.result
                     
                  }
               })   
            }
         }
      }
      else if(e.target.name == 'fileLogo'){
         if(!((e.target.files[0].type).includes("image/"))){
            NotificationManager.error('El tipo de archivo no es valido','',5000);
            this.setState({
               form:{
                  ...this.state.form,
                  fileLogo:""
               }
            })
         }
         else if(e.target.files[0].size >= 70000 ){
            NotificationManager.error('El archivo excedió el tamaño límite','',5000);
            this.setState({
               form:{
                  ...this.state.form,
                  fileLogo:""
               }
            })
         }
         else{
            let files = e.target.files;
            let reader = new FileReader();
            reader.readAsDataURL(files[0])
            reader.onload=(e)=>{
               this.setState({
                  form:{
                     ...this.state.form,
                     fileLogo:e.target.result
                  }
               })
            }
         }
      }
      else if(e.target.name == 'sizeLogoMobile' && e.target.value <= 0){
            this.setState({
               form:{
                  ...this.state.form,
                  [e.target.name]:""
               }
            })
      }

      else if(e.target.name == 'sizeLogoWeb' && e.target.value <= 0){
         this.setState({
            form:{
               ...this.state.form,
               [e.target.name]:""
            }
         })
   }

      // else if(e.target.name == 'sizeLogoMobile' && e.target.value < 10){
      //    this.setState({
      //       form:{
      //          ...this.state.form,
      //          [e.target.name]:10
      //       }
      //    })
      // }

      else{
         this.setState({
            form:{
               ...this.state.form,
               [e.target.name]: e.target.value
            }
         })
      }
   }
  
   async handleSubmit(e){
      e.preventDefault();
      const {
         email,
         nombre,
         apellidos,
         edad,
         genero,
         telefono,
         num_voucher,
         num_habitacion,
         razon_visita,
         terminos_condiciones_esp,
         terminos_condiciones_eng,
         titlePortal,
         fileBackground,
         fileLogo,
         sizeLogoMobile,
         sizeLogoWeb,
         buttonColors,
         backgroundColorForm,
         colorTitleForm,
         colorFontForm,
         filesBanner,
      } = this.state.form
     
      if(terminos_condiciones_esp == '' || terminos_condiciones_eng == ''){
         NotificationManager.error('Los terminos y condiciones son requeridos','',5000);
      }
      else if( (((titlePortal == "" || fileBackground == "") || (fileLogo == "" || sizeLogoMobile == "")) || (sizeLogoWeb == "" || buttonColors == "") || (colorTitleForm == "" || colorFontForm == ""))){
         NotificationManager.error('Todos los campos son obligatorios','',5000);
      } 
      else{
         let config = {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(this.state.form)
			};

         await fetch(`${localStorage.urlDomain}api/campanias`, config);
         
         this.props.history.goBack();
      }
   }

   //fin métodos diseño
   
   render() {
     
      const theme = {
         direction: 'rlt'
      }
      const themeLang = {
         direction: 'rlt'
      }
      const {
         //constantes formulario
         email,
         nombre,
         apellidos,
         edad,
         genero,
         telefono,
         num_voucher,
         num_habitacion,
         razon_visita,
        
         terminos_condiciones_esp,
         terminos_condiciones_eng,
         // constantes diseño
         fileBackground,
         fileLogo,
         titlePortal,
         sizeLogoMobile,
         sizeLogoWeb,
         buttonColors,
         backgroundColorForm,
         colorTitleForm,
         colorFontForm,
         imgsBannerSwitch 
      } = this.state.form;

      //constantes formulario
      const modules = {
         toolbar: [
           [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
           [{ 'font': [] }],
           ['bold', 'italic', 'underline', 'strike', 'blockquote'],
           [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
           ['link', 'image'],
           ['clean'],
           [{ 'align': [] }],
           ['code-block']
         ],
       };
       
       const formats = [
         'header',
         'font',
         'bold', 'italic', 'underline', 'strike', 'blockquote',
         'list', 'bullet', 'indent',
         'link', 'image', 'align',
         'code-block'
      ];
      //fin constantes formulario

      //constantes diseño
       const files = this.state.form.filesBanner.map(file => (
         <li key={file.name}>
            {file.name} - {file.size} bytes
         </li>
      ));
      // fin constantes diseño

      const IOSSwitch = withStyles(theme => ({
         root: {
           width: 38,
           height: 19,
           padding: 0,
           margin: theme.spacing(1),
         },
         switchBase: {
           padding: 1,
           '&$checked': {
             transform: 'translateX(16px)',
             color: theme.palette.common.white,
             '& + $track': {
               backgroundColor: '#52c6d8',
               opacity: 1,
               border: 'none',
             },
           },
           '&$focusVisible $thumb': {
             color: '#52c6d8',
             border: '6px solid #fff',
           },
         },
         thumb: {
            // marginLeft:'4px',
            width: 18,
            height: 16,
         },
         track: {
           borderRadius: 26 / 2,
           border: `1px solid ${theme.palette.grey[400]}`,
           backgroundColor: theme.palette.grey[50],
           opacity: 1,
           transition: theme.transitions.create(['background-color', 'border']),
         },
         checked: {},
         focusVisible: {},
       }))(({ classes, ...props }) => {
         return (
           <Switch
             focusVisibleClassName={classes.focusVisible}
             disableRipple
             classes={{
               root: classes.root,
               switchBase: classes.switchBase,
               thumb: classes.thumb,
               track: classes.track,
               checked: classes.checked,
             }}
             {...props}
           />
         );
       });
      
      return (
         <div className="row" style={{marginBottom:"20px"}}>
            <div className="col-lg-6" >
               <Card variant="outlined">
                  <CardContent>
                     <div className="Tab-wrap" style={{backgroundColor: "#35475f",border: "0.3px solid #c1c1c1", padding:"1px"}}>
                        {/* border: "0.3px solid #c1c1c1 !important",borderRadius:"6px !important", padding: "20px!important", */}
                        <AppBar position="static" >
                           <Tabs
                              value={this.state.value}
                              onChange={this.handleChangeTabs}
                              indicatorColor="primary"
                              textColor="primary"
                              variant="standard"
                           >
                              <Tab style={{backgroundColor: "#3e7296"}} label={'Formulario'} />
                              <Tab style={{backgroundColor: "#099c96"}} label={'Diseño'} />
                           </Tabs>
                        </AppBar>
                        <SwipeableViews
                           axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                           index={this.state.value}
                           onChangeIndex={this.handleChangeTabsIndex}
                           >
                           <div className="card mb-0 transaction-box">
                              <TabContainer dir={theme.direction}>
                                 <RctCardContent>
                                    <div className="row" style={{backgroundColor: "#35475f",padding: "20px"}}>
                                       <div className="col-lg-6">
                                          <FormGroupUI>
                                             <FormControlLabelUI
                                                control={<Checkbox checked={email} onChange={this.handleChangeCheckBox('email')} value="email" />}
                                                // control={<Checkbox checked={false} onChange={} value="email" />}
                                                label="Correo"
                                             />
                                             <FormControlLabelUI
                                                control={<Checkbox checked={nombre} onChange={this.handleChangeCheckBox('nombre')} value="nombre" />}
                                                label="Nombres y Apellidos"
                                             />
                                             <FormControlLabelUI
                                                control={<Checkbox checked={edad} onChange={this.handleChangeCheckBox('edad')} value="edad" />}
                                                label="Edad"
                                             />
                                             <FormControlLabelUI
                                                control={<Checkbox checked={genero} onChange={this.handleChangeCheckBox('genero')} value="genero" />}
                                                label="Genero"
                                             />
                                          </FormGroupUI>
                                       </div>

                                       <div className="col-lg-6">
                                          <FormGroupUI>
                                             <FormControlLabelUI
                                                control={<Checkbox checked={telefono} onChange={this.handleChangeCheckBox('telefono')} value="telefono" />}
                                                label="Teléfono"
                                             />
                                             <FormControlLabelUI
                                                control={<Checkbox checked={num_voucher} onChange={this.handleChangeCheckBox('num_voucher')} value="num_voucher" />}
                                                label="Voucher"
                                             />
                                             <FormControlLabelUI
                                                control={<Checkbox checked={num_habitacion} onChange={this.handleChangeCheckBox('num_habitacion')} value="num_habitacion" />}
                                                label="Número Habitación"
                                             />
                                             <FormControlLabelUI
                                                control={<Checkbox checked={razon_visita} onChange={this.handleChangeCheckBox('razon_visita')} value="razon_visita" />}
                                                label="Razón Visita"
                                             />
                                          </FormGroupUI>
                                       </div>
                                       <div className="col-lg-12" style={{marginTop:"15px"}}>
                                          <h4 className="termsCon">Terminos y Condiciones</h4>
                                          <div className="Tab-wrap">
                                             <AppBar position="static" >
                                                <Tabs
                                                   value={this.state.valueLang}
                                                   onChange={this.handleChangeTabsLang}
                                                   indicatorColor="primary"
                                                   textColor="primary"
                                                   variant="standard"
                                                >
                                                   <Tab style={{backgroundColor:"#304158"}} label={'Español'} />
                                                   <Tab style={{backgroundColor:"#354f71"}} label={'Inglés'} />
                                                </Tabs>
                                             </AppBar>
                                             <SwipeableViews
                                                axis={themeLang.direction === 'rtl' ? 'x-reverse' : 'x'}
                                                index={this.state.valueLang}
                                                onChangeIndex={this.handleChangeTabsIndexLang}
                                             >
                                             <div className="card mb-0 transaction-box">
                                                <TabContainer dir={themeLang.direction}>
                                                   <RctCardContent>
                                                   <div className="editor-wrapper">
                                                      <ReactQuill theme="snow" modules={modules} formats={formats} value={terminos_condiciones_esp} 
                                                         onChange={this.rteChangeEsp}/>
                                                   </div>
                                                   </RctCardContent>
                                                </TabContainer>
                                             </div>
                                             <div className="card mb-0 transaction-box">
                                                <TabContainer dir={themeLang.direction}>
                                                   <RctCardContent>
                                                   <div className="editor-wrapper">
                                                      <ReactQuill theme="snow" modules={modules} formats={formats} value={terminos_condiciones_eng} 
                                                         onChange={this.rteChangeEng}/>
                                                   </div>
                                                   </RctCardContent>
                                                </TabContainer>
                                             </div>
                                             </SwipeableViews>
                                          </div>
                                       </div>
                                    </div>
                                 </RctCardContent>
                              </TabContainer>
                           </div>
                           <div className="card mb-0 transaction-box">
                              <TabContainer dir={theme.direction}>
                                 <RctCardContent>
                                       <div className="row" style={{backgroundColor: "#35475f",padding: "20px"}}>
                                          <div className="col-lg-6">
                                             <FormGroup>
                                                <Label for="titlePortal">Titulo Portal Cautivo</Label>
                                                <Input type="text" autoComplete="off" name="titlePortal" id="titlePortal" value={titlePortal} onChange={() => this.handleChange(event)} placeholder="Titulo Portal Cautivo" />
                                             </FormGroup>
                                             <FormGroup>
                                                <Label for="fileBackground">Imagen de Fondo</Label>
                                                <Input accept="image/*" type="file" autoComplete="off" name="fileBackground" id="fileBackground" onChange={(e) => this.handleChange(e)} />
                                                <FormText color="white">
                                                   Recuerde que el tamaño máximo es de 500kb y
                                                   1920 x 1280.
                                                </FormText>
                                             </FormGroup>
                                             <FormGroup>
                                                <Label for="fileLogo">Logo</Label>
                                                <Input accept="image/*" type="file" autoComplete="off" name="fileLogo" id="fileLogo" onChange={(e) => this.handleChange(e)} />
                                                <FormText color="white">
                                                   Recuerde que el tamaño máximo es de 50kb.
                                                </FormText>
                                             </FormGroup>
                                             <FormGroup>
                                                <Label for="sizeLogoMobile">Tamaño Logo Movil</Label>
                                                <Input type="number" autoComplete="off" name="sizeLogoMobile" id="sizeLogoMobile" value={sizeLogoMobile} onChange={() => this.handleChange(event)} placeholder="Tamaño Logo Movil" />
                                             </FormGroup>
                                             <FormGroup>
                                                <Label for="sizeLogoWeb">Tamaño Logo Web</Label>
                                                <Input type="number" autoComplete="off" name="sizeLogoWeb" id="sizeLogoWeb" value={sizeLogoWeb} onChange={() => this.handleChange(event)} placeholder="Tamaño Logo Web" />
                                             </FormGroup>
                                             <FormGroup>
                                                <Label for="buttonColors">Color de Botones</Label>
                                                <input type="color" autoComplete="off" name="buttonColors" id="buttonColors" value={buttonColors} onChange={() => this.handleChange(event)} className="inputColor"/>
                                             </FormGroup>
                                             
                                          
                                          </div>
                                          <div className="col-lg-6" style={{marginBottom:"38px", marginTop:"20px"}}>
                                                <div style={{marginBottom:"39px"}}>
                                                   <Label for="colorTitleForm">Color de Fondo del Formulario</Label>
                                                   <input type="color" autoComplete="off" name="backgroundColorForm" rgba id="backgroundColorForm" value={backgroundColorForm} onChange={() => this.handleChange(event)} className="inputColor"/>
                                                </div>
                                                <div style={{marginBottom:"39px"}}>
                                                   <Label for="colorTitleForm">Color Titulo del Formulario</Label>
                                                   <input type="color" autoComplete="off" name="colorTitleForm" id="colorTitleForm" value={colorTitleForm} onChange={() => this.handleChange(event)} className="inputColor"/>
                                                </div>
                                                <div style={{marginTop:"15px"}}>
                                                      <Label for="colorFontForm">Color de la Fuente del Formulario</Label>
                                                      <input type="color" autoComplete="off" name="colorFontForm" id="colorFontForm"  value={colorFontForm} onChange={() => this.handleChange(event)} className="inputColor"/>
                                                </div>
                                                <div style={{marginTop:"35px"}}>
                                                   <FormControlLabel
                                                      control={<Checkbox checked={imgsBannerSwitch} onChange={this.handleChangeCheckBox('imgsBannerSwitch')} value="imgsBannerSwitch" />}
                                                      label="Imagenes del Banner"
                                                   />
                                                </div>
                                                {imgsBannerSwitch?
                                                <FormGroup>
                                                   <Dropzone onDrop={this.onDrop}>
                                                      {({getRootProps, getInputProps}) => (
                                                         <section className="container">
                                                            <div {...getRootProps({className: 'dropzone'})}>
                                                            <input {...getInputProps()} />
                                                            <p> Arrastre y suelte algunas imagenes aquí, o haga click para seleccionarlas</p>
                                                            </div>
                                                            <aside>
                                                            <h4 className="filesStyle">Archivos</h4>
                                                            <ul>{files}</ul>
                                                            </aside>
                                                         </section>
                                                      )}
                                                   </Dropzone>
                                                </FormGroup>
                                                :
                                                <div style={{paddingTop:"186px"}}>
                                                   &nbsp;
                                                </div>
                                                }
                                          </div>
                                          <div className="col-lg-12" style={{paddingBottom:"35px",paddingTop:"10px"}}>
                                             <Button onClick={() => this.handleSubmit(event)} color="primary" style={{ margin:"0 auto", padding:"10px 50px" }}>Guardar</Button>
                                          </div>
                                       </div>
                                 </RctCardContent>
                              </TabContainer>
                           </div>
                        </SwipeableViews>
                     </div>
                  </CardContent>
               </Card>
            </div>
            <div className="col-lg-6">
               <Card variant="outlined">
                  <CardContent>
                  <div className="container" >
                        <div className="row h-100">
                           <div className="col-sm-12 my-auto" >
                           { fileBackground ?  
                              <div className="Tab-wrap" style={{backgroundColor: "#35475f",border: "0.3px solid #c1c1c1", padding:"1px"}}>
                                 <AppBar position="static" >
                                    <Tabs
                                       value={this.state.valueViewsFormat}
                                       onChange={this.handleChangeTabsViewsFormat}
                                       indicatorColor="primary"
                                       textColor="primary"
                                       variant="standard"
                                    >
                                       <Tab style={{backgroundColor:"#304158"}} label={'Web'} />
                                       <Tab style={{backgroundColor:"#354f71"}} label={'Móvil'} />
                                    </Tabs>
                                 </AppBar>
                                 <SwipeableViews
                                    axis={themeLang.direction === 'rtl' ? 'x-reverse' : 'x'}
                                    index={this.state.valueViewsFormat}
                                    onChangeIndex={this.handleChangeTabsIndexViewsFormat}
                                 >
                                 <div className="card mb-0 transaction-box" style={{padding: "26px 5px 10px 5px", backgroundColor:"#35475f"}}>
                                    <TabContainer dir={themeLang.direction}>
                                       <RctCardContent>
                                       <div className="cardCont" style={{background: "white", backgroundImage: `url(${fileBackground})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                                          <div className="logo">                        
                                             <img className="img-logo" src={fileLogo ? fileLogo:''} style={{maxWidth: `${sizeLogoWeb}px`}} alt="" />
                                             <div className="titleForm" style={{color:colorTitleForm}}>{titlePortal}</div>
                                          </div>
                                       <form className="formulario"  action="" style={{background: backgroundColorForm}}>
                                          <div className="form-row">
                                          { nombre ?
                                             <div className="form-group col-md-6 colorPlaceHolder" name="form_group_nombre" id="form_group_nombre">
                                                <input className="" type="text" autoComplete="off" className="form-control form-control-sm" id="nombre" name="nombre" placeholder="Nombre" />
                                             </div>
                                             :
                                             <div></div>
                                          }
                                          { apellidos ?
                                             <div className="form-group col-md-6 colorPlaceHolder" name="form_group_apellidos" id="form_group_apellidos">
                                                <input className="" type="text" autoComplete="off"  className="form-control form-control-sm" id="apellidos" name="apellidos" placeholder="Apellidos"/>
                                             </div>
                                          :
                                          <div></div>
                                          }
                                          </div>
                                             { email ? 
                                             <div className="form-group colorPlaceHolder" id="form_group_email"  name="form_group_email">
                                                <input className="colorPlaceHolder" type="email" autoComplete="off" className="form-control form-control-sm" id="email" name="email" placeholder="Correo Electrónico" />
                                             </div>
                                             :
                                             <div></div>
                                             }
                                             { telefono ?
                                             <div className="form-group colorPlaceHolder" id="form_group_telefono"  name="form_group_telefono">
                                                <input className="colorPlaceHolder" type="tel" autoComplete="off" className="form-control form-control-sm" id="telefono" name="telefono" placeholder="Telefono" />
                                             </div>
                                             :
                                             <div></div>
                                             }
                                             { edad ?
                                             <div className="form-group colorPlaceHolder" id="form_group_edad"  name="form_group_edad">
                                                <input className="colorPlaceHolder" type="text" autoComplete="off" className="form-control form-control-sm" id="edad" name="edad" placeholder="Edad" />
                                             </div>
                                                :
                                             <div></div>
                                             }
                                             { genero ?
                                             <div className="form-group colorPlaceHolder" id="form_group_genero"  name="form_group_genero">
                                                <select id="genero"  name="genero" className="form-control form-control-sm">
                                                      <option selected value="">Selecciona un género</option>
                                                      <option value="Hombre">Hombre</option>
                                                      <option value="Mujer">Mujer</option>
                                                      <option value="Otro">Otro</option>
                                                </select>
                                             </div>
                                                :
                                                <div></div>
                                             }
                                             { num_habitacion ?
                                             <div className="form-group colorPlaceHolder" id="form_group_habitacion"  name="form_group_habitacion">
                                                <input type="text" autoComplete="off" className="form-control form-control-sm" id="num_habitacion" name="num_habitacion" placeholder="Ingrese el número de habitación" />
                                             </div>
                                                :
                                             <div></div>
                                             }
                                             { num_voucher ?
                                             <div className="form-group colorPlaceHolder" id="form_group_voucher" name="form_group_voucher">
                                                <input type="text"  autoComplete="off" className="form-control form-control-sm" id="num_voucher" name="num_voucher" placeholder="Ingrese el pin acceso a internet" />
                                             </div>
                                                :
                                             <div></div>
                                             }
                                             { razon_visita ?
                                             <div className="form-group colorPlaceHolder" id="form_group_razon_visita"  name="form_group_razon_visita">
                                                <select id="razon_visita"  name="razon_visita" className="form-control form-control-sm">
                                                      <option selected value="">Selecciona una razón de visita</option>
                                                      <option value="Vacaciones">Vacaciones</option>
                                                      <option value="Trabajo">Trabajo</option>
                                                      <option value="Congreso">Congreso</option>
                                                      <option value="Convencion">Convencion</option>
                                                      <option value="Otro">Otro</option>
                                                </select>
                                             </div>
                                                :
                                                <div></div>
                                             }
                                             <div className="form-group check-terminos colorPlaceHolder" id="form_group_check" name="form_group_check">
                                                   <div className="custom-control custom-switch">
                                                      <input type="checkbox" className="custom-control-input" id="customSwitches" name="customSwitches" />
                                                      

                                                      <FormControlLabel
                                                         control={
                                                            <IOSSwitch
                                                               checked={this.state.checkedB}
                                                               onChange={this.handleSwitch('checkedB')}
                                                               value="checkedB"
                                                            />
                                                            
                                                         }
                                                         // label={<a href="#popup" style={{color:colorFontForm}}>Terminos y Condiciones</a>}
                                                         label={<a  style={{color:colorFontForm}}>Aceptar Terminos y Condiciones</a>}
                                                      />
                                                   
                                                   </div>
                                             </div>

                                             <div className="form-btn">
                                                <button type="submit" id="submit" className="btn" style={{backgroundColor:buttonColors, color:colorFontForm}}>Continuar</button>
                                             </div>     
                                       </form>
                                    </div>
                                       </RctCardContent>
                                    </TabContainer>
                                 </div>
                                 <div className="card mb-0 transaction-box" style={{padding: "26px 44px 10px 44px", backgroundColor:"#35475f"}}>
                                    <TabContainer dir={themeLang.direction}>
                                       <RctCardContent>
                                       <div className="cardCont" style={{background: "white", backgroundImage: `url(${fileBackground})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                                          <div className="logo">                        
                                             <img className="img-logo" src={fileLogo ? fileLogo:''} style={{maxWidth: `${sizeLogoMobile}px`}} alt="" />
                                             <div className="titleForm" style={{color:colorTitleForm}}>{titlePortal}</div>
                                          </div>
                                          <form className="formulario"  action="" style={{background: backgroundColorForm}}>
                                             <div className="form-row">
                                             { nombre ?
                                                <div className="form-group col-md-12 colorPlaceHolder" name="form_group_nombre" id="form_group_nombre">
                                                   <input className="" type="text" autoComplete="off" className="form-control form-control-sm" id="nombre" name="nombre" placeholder="Nombre" />
                                                </div>
                                                :
                                                <div></div>
                                             }
                                             { apellidos ?
                                                <div className="form-group col-md-12 colorPlaceHolder" name="form_group_apellidos" id="form_group_apellidos">
                                                   <input className="" type="text" autoComplete="off"  className="form-control form-control-sm" id="apellidos" name="apellidos" placeholder="Apellidos"/>
                                                </div>
                                             :
                                             <div></div>
                                             }
                                             </div>
                                                { email ? 
                                                <div className="form-group colorPlaceHolder" id="form_group_email"  name="form_group_email">
                                                   <input className="colorPlaceHolder" type="email" autoComplete="off" className="form-control form-control-sm" id="email" name="email" placeholder="Correo Electrónico" />
                                                </div>
                                                :
                                                <div></div>
                                                }
                                                { telefono ?
                                                <div className="form-group colorPlaceHolder" id="form_group_telefono"  name="form_group_telefono">
                                                   <input className="colorPlaceHolder" type="tel" autoComplete="off" className="form-control form-control-sm" id="telefono" name="telefono" placeholder="Telefono" />
                                                </div>
                                                :
                                                <div></div>
                                                }
                                                { edad ?
                                                <div className="form-group colorPlaceHolder" id="form_group_edad"  name="form_group_edad">
                                                   <input className="colorPlaceHolder" type="text" autoComplete="off" className="form-control form-control-sm" id="edad" name="edad" placeholder="Edad" />
                                                </div>
                                                   :
                                                <div></div>
                                                }
                                                { genero ?
                                                <div className="form-group colorPlaceHolder" id="form_group_genero"  name="form_group_genero">
                                                   <select id="genero"  name="genero" className="form-control form-control-sm">
                                                         <option selected value="">Selecciona un género</option>
                                                         <option value="Hombre">Hombre</option>
                                                         <option value="Mujer">Mujer</option>
                                                         <option value="Otro">Otro</option>
                                                   </select>
                                                </div>
                                                   :
                                                   <div></div>
                                                }
                                                { num_habitacion ?
                                                <div className="form-group colorPlaceHolder" id="form_group_habitacion"  name="form_group_habitacion">
                                                   <input type="text" autoComplete="off" className="form-control form-control-sm" id="num_habitacion" name="num_habitacion" placeholder="Ingrese el número de habitación" />
                                                </div>
                                                   :
                                                <div></div>
                                                }
                                                { num_voucher ?
                                                <div className="form-group colorPlaceHolder" id="form_group_voucher" name="form_group_voucher">
                                                   <input type="text"  autoComplete="off" className="form-control form-control-sm" id="num_voucher" name="num_voucher" placeholder="Ingrese el pin acceso a internet" />
                                                </div>
                                                   :
                                                <div></div>
                                                }
                                                { razon_visita ?
                                                <div className="form-group colorPlaceHolder" id="form_group_razon_visita"  name="form_group_razon_visita">
                                                   <select id="razon_visita"  name="razon_visita" className="form-control form-control-sm">
                                                         <option selected value="">Selecciona una razón de visita</option>
                                                         <option value="Vacaciones">Vacaciones</option>
                                                         <option value="Trabajo">Trabajo</option>
                                                         <option value="Congreso">Congreso</option>
                                                         <option value="Convencion">Convencion</option>
                                                         <option value="Otro">Otro</option>
                                                   </select>
                                                </div>
                                                   :
                                                   <div></div>
                                                }
                                                <div className="form-group check-terminos colorPlaceHolder" id="form_group_check" name="form_group_check">
                                                      <div className="custom-control custom-switch">
                                                         <input type="checkbox" className="custom-control-input" id="customSwitches" name="customSwitches" />
                                                         

                                                         <FormControlLabel
                                                            control={
                                                               <IOSSwitch
                                                                  checked={this.state.checkedB}
                                                                  onChange={this.handleSwitch('checkedB')}
                                                                  value="checkedB"
                                                               />
                                                               
                                                            }
                                                            // label={<a href="#popup" style={{color:colorFontForm}}>Terminos y Condiciones</a>}
                                                            label={<a  style={{color:colorFontForm}}>Aceptar Terminos y Condiciones</a>}
                                                         />
                                                      
                                                      </div>
                                                </div>

                                                <div className="form-btn">
                                                   <button type="submit" id="submit" className="btn" style={{backgroundColor:buttonColors, color:colorFontForm}}>Continuar</button>
                                                </div>     
                                          </form>
                                       </div>
                                       </RctCardContent>
                                    </TabContainer>
                                 </div>
                                 </SwipeableViews>
                              </div>
                              :

                              <div className="Tab-wrap" style={{backgroundColor: "#35475f",border: "0.3px solid #c1c1c1", padding:"1px"}}>
                              <AppBar position="static" >
                                 <Tabs
                                    value={this.state.valueViewsFormat}
                                    onChange={this.handleChangeTabsViewsFormat}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    variant="standard"
                                 >
                                    <Tab style={{backgroundColor:"#304158"}} label={'Web'} />
                                    <Tab style={{backgroundColor:"#354f71"}} label={'Móvil'} />
                                 </Tabs>
                              </AppBar>
                              <SwipeableViews
                                 axis={themeLang.direction === 'rtl' ? 'x-reverse' : 'x'}
                                 index={this.state.valueViewsFormat}
                                 onChangeIndex={this.handleChangeTabsIndexViewsFormat}
                              >
                              <div className="card mb-0 transaction-box" style={{padding: "26px 5px 10px 5px", backgroundColor:"#35475f"}}>
                                 <TabContainer dir={themeLang.direction}>
                                    <RctCardContent>
                                    <div className="cardCont" style={{background: "white", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                                       <div className="logo">                        
                                          <img className="img-logo" src={fileLogo ? fileLogo : ''} style={{marginBottom:'10px',maxWidth: `${sizeLogoWeb}px`}} alt="s" />
                                          <div className="titleForm" style={{color:colorTitleForm}}>{titlePortal}</div>
                                       </div>
                                    <form className="formulario"  action="" style={{background: backgroundColorForm}}>
                                       <div className="form-row">
                                       { nombre ?
                                          <div className="form-group col-md-6 colorPlaceHolder" name="form_group_nombre" id="form_group_nombre">
                                             <input className="" type="text" autoComplete="off" className="form-control form-control-sm" id="nombre" name="nombre" placeholder="Nombre" />
                                          </div>
                                          :
                                          <div></div>
                                       }
                                       { apellidos ?
                                          <div className="form-group col-md-6 colorPlaceHolder" name="form_group_apellidos" id="form_group_apellidos">
                                             <input className="" type="text" autoComplete="off"  className="form-control form-control-sm" id="apellidos" name="apellidos" placeholder="Apellidos"/>
                                          </div>
                                       :
                                       <div></div>
                                       }
                                       </div>
                                          { email ? 
                                          <div className="form-group colorPlaceHolder" id="form_group_email"  name="form_group_email">
                                             <input className="colorPlaceHolder" type="email" autoComplete="off" className="form-control form-control-sm" id="email" name="email" placeholder="Correo Electrónico" />
                                          </div>
                                          :
                                          <div></div>
                                          }
                                          { telefono ?
                                          <div className="form-group colorPlaceHolder" id="form_group_telefono"  name="form_group_telefono">
                                             <input className="colorPlaceHolder" type="tel" autoComplete="off" className="form-control form-control-sm" id="telefono" name="telefono" placeholder="Telefono" />
                                          </div>
                                          :
                                          <div></div>
                                          }
                                          { edad ?
                                          <div className="form-group colorPlaceHolder" id="form_group_edad"  name="form_group_edad">
                                             <input className="colorPlaceHolder" type="text" autoComplete="off" className="form-control form-control-sm" id="edad" name="edad" placeholder="Edad" />
                                          </div>
                                             :
                                          <div></div>
                                          }
                                          { genero ?
                                          <div className="form-group colorPlaceHolder" id="form_group_genero"  name="form_group_genero">
                                             <select id="genero"  name="genero" className="form-control form-control-sm">
                                                   <option selected value="">Selecciona un género</option>
                                                   <option value="Hombre">Hombre</option>
                                                   <option value="Mujer">Mujer</option>
                                                   <option value="Otro">Otro</option>
                                             </select>
                                          </div>
                                             :
                                             <div></div>
                                          }
                                          { num_habitacion ?
                                          <div className="form-group colorPlaceHolder" id="form_group_habitacion"  name="form_group_habitacion">
                                             <input type="text" autoComplete="off" className="form-control form-control-sm" id="num_habitacion" name="num_habitacion" placeholder="Ingrese el número de habitación" />
                                          </div>
                                             :
                                          <div></div>
                                          }
                                          { num_voucher ?
                                          <div className="form-group colorPlaceHolder" id="form_group_voucher" name="form_group_voucher">
                                             <input type="text"  autoComplete="off" className="form-control form-control-sm" id="num_voucher" name="num_voucher" placeholder="Ingrese el pin acceso a internet" />
                                          </div>
                                             :
                                          <div></div>
                                          }
                                          { razon_visita ?
                                          <div className="form-group colorPlaceHolder" id="form_group_razon_visita"  name="form_group_razon_visita">
                                             <select id="razon_visita"  name="razon_visita" className="form-control form-control-sm">
                                                   <option selected value="">Selecciona una razón de visita</option>
                                                   <option value="Vacaciones">Vacaciones</option>
                                                   <option value="Trabajo">Trabajo</option>
                                                   <option value="Congreso">Congreso</option>
                                                   <option value="Convencion">Convencion</option>
                                                   <option value="Otro">Otro</option>
                                             </select>
                                          </div>
                                             :
                                             <div></div>
                                          }
                                          <div className="form-group check-terminos colorPlaceHolder" id="form_group_check" name="form_group_check">
                                                <div className="custom-control custom-switch">
                                                   <input type="checkbox" className="custom-control-input" id="customSwitches" name="customSwitches" />
                                                   

                                                   <FormControlLabel
                                                      control={
                                                         <IOSSwitch
                                                            checked={this.state.checkedB}
                                                            onChange={this.handleSwitch('checkedB')}
                                                            value="checkedB"
                                                         />
                                                         
                                                      }
                                                      // label={<a href="#popup" style={{color:colorFontForm}}>Terminos y Condiciones</a>}
                                                      label={<a  style={{color:colorFontForm}}>Aceptar Terminos y Condiciones</a>}
                                                   />
                                                
                                                </div>
                                          </div>

                                          <div className="form-btn">
                                             <button type="submit" id="submit" className="btn" style={{backgroundColor:buttonColors, color:colorFontForm}}>Continuar</button>
                                          </div>     
                                    </form>
                                 </div>
                                    </RctCardContent>
                                 </TabContainer>
                              </div>
                              <div className="card mb-0 transaction-box" style={{padding: "26px 44px 10px 44px", backgroundColor:"#35475f"}}>
                                 <TabContainer dir={themeLang.direction}>
                                    <RctCardContent>
                                       <div className="cardCont" style={{background: "white", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                                          <div className="logo">                        
                                             <img className="img-logo" src={fileLogo ? fileLogo : ''} style={{marginBottom:'10px',maxWidth: `${sizeLogoMobile}px`}} alt="s" />
                                             <div className="titleForm" style={{color:colorTitleForm}}>{titlePortal}</div>
                                          </div>
                                       <form className="formulario"  action="" style={{background: backgroundColorForm}}>
                                          <div className="form-row">
                                          { nombre ?
                                             <div className="form-group col-md-12 colorPlaceHolder" name="form_group_nombre" id="form_group_nombre">
                                                <input className="" type="text" autoComplete="off" className="form-control form-control-sm" id="nombre" name="nombre" placeholder="Nombre" />
                                             </div>
                                             :
                                             <div></div>
                                          }
                                          { apellidos ?
                                             <div className="form-group col-md-12 colorPlaceHolder" name="form_group_apellidos" id="form_group_apellidos">
                                                <input className="" type="text" autoComplete="off"  className="form-control form-control-sm" id="apellidos" name="apellidos" placeholder="Apellidos"/>
                                             </div>
                                          :
                                          <div></div>
                                          }
                                          </div>
                                             { email ? 
                                             <div className="form-group colorPlaceHolder" id="form_group_email"  name="form_group_email">
                                                <input className="colorPlaceHolder" type="email" autoComplete="off" className="form-control form-control-sm" id="email" name="email" placeholder="Correo Electrónico" />
                                             </div>
                                             :
                                             <div></div>
                                             }
                                             { telefono ?
                                             <div className="form-group colorPlaceHolder" id="form_group_telefono"  name="form_group_telefono">
                                                <input className="colorPlaceHolder" type="tel" autoComplete="off" className="form-control form-control-sm" id="telefono" name="telefono" placeholder="Telefono" />
                                             </div>
                                             :
                                             <div></div>
                                             }
                                             { edad ?
                                             <div className="form-group colorPlaceHolder" id="form_group_edad"  name="form_group_edad">
                                                <input className="colorPlaceHolder" type="text" autoComplete="off" className="form-control form-control-sm" id="edad" name="edad" placeholder="Edad" />
                                             </div>
                                                :
                                             <div></div>
                                             }
                                             { genero ?
                                             <div className="form-group colorPlaceHolder" id="form_group_genero"  name="form_group_genero">
                                                <select id="genero"  name="genero" className="form-control form-control-sm">
                                                      <option selected value="">Selecciona un género</option>
                                                      <option value="Hombre">Hombre</option>
                                                      <option value="Mujer">Mujer</option>
                                                      <option value="Otro">Otro</option>
                                                </select>
                                             </div>
                                                :
                                                <div></div>
                                             }
                                             { num_habitacion ?
                                             <div className="form-group colorPlaceHolder" id="form_group_habitacion"  name="form_group_habitacion">
                                                <input type="text" autoComplete="off" className="form-control form-control-sm" id="num_habitacion" name="num_habitacion" placeholder="Ingrese el número de habitación" />
                                             </div>
                                                :
                                             <div></div>
                                             }
                                             { num_voucher ?
                                             <div className="form-group colorPlaceHolder" id="form_group_voucher" name="form_group_voucher">
                                                <input type="text"  autoComplete="off" className="form-control form-control-sm" id="num_voucher" name="num_voucher" placeholder="Ingrese el pin acceso a internet" />
                                             </div>
                                                :
                                             <div></div>
                                             }
                                             { razon_visita ?
                                             <div className="form-group colorPlaceHolder" id="form_group_razon_visita"  name="form_group_razon_visita">
                                                <select id="razon_visita"  name="razon_visita" className="form-control form-control-sm">
                                                      <option selected value="">Selecciona una razón de visita</option>
                                                      <option value="Vacaciones">Vacaciones</option>
                                                      <option value="Trabajo">Trabajo</option>
                                                      <option value="Congreso">Congreso</option>
                                                      <option value="Convencion">Convencion</option>
                                                      <option value="Otro">Otro</option>
                                                </select>
                                             </div>
                                                :
                                                <div></div>
                                             }
                                             <div className="form-group check-terminos colorPlaceHolder" id="form_group_check" name="form_group_check">
                                                   <div className="custom-control custom-switch">
                                                      <input type="checkbox" className="custom-control-input" id="customSwitches" name="customSwitches" />
                                                      

                                                      <FormControlLabel
                                                         control={
                                                            <IOSSwitch
                                                               checked={this.state.checkedB}
                                                               onChange={this.handleSwitch('checkedB')}
                                                               value="checkedB"
                                                            />
                                                            
                                                         }
                                                         // label={<a href="#popup" style={{color:colorFontForm}}>Terminos y Condiciones</a>}
                                                         label={<a  style={{color:colorFontForm}}>Aceptar Terminos y Condiciones</a>}
                                                      />
                                                   
                                                   </div>
                                             </div>

                                             <div className="form-btn">
                                                <button type="submit" id="submit" className="btn" style={{backgroundColor:buttonColors, color:colorFontForm}}>Continuar</button>
                                             </div>     
                                       </form>
                                    </div>
                                    </RctCardContent>
                                 </TabContainer>
                              </div>
                              </SwipeableViews>
                           </div>
                           }
                           </div>
                        </div>
                    </div>

                    <div className="popup" id="popup">
                        <div className="popup-inner">
                              <div className="popup__text">
                                 <div id="incluirTerminosCondiciones_es" className="container_terminos">
                                    <div className="logo_terminos">
                                       <img src="" alt="" />
                                    </div>
                                    <div style={{color:"black"}}>
                                    </div>
                                 </div>              
                              </div>
                              <a className="popup__close" href="#">X</a>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>
      );
   }
}
