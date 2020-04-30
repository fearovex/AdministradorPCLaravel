import React, { Component } from "react";
// import {
//    LiveProvider,
//    LiveEditor,
//    LiveError,
//    LivePreview
//  } from 'react-live';
//  import { RctCardContent } from 'Components/RctCard';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
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
import '../cms/formStyles2.css';
import '../cms/formStyles3.css';
import '../cms/styles.css';
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import moment from "moment"
import { DateTimePicker } from '@material-ui/pickers'
import Select from '@material-ui/core/Select';
import DropzoneComponent from 'react-dropzone-component';
import FullScreenLoader from 'Components/FullScreenLoader'

// import Radium, { Style } from 'radium'

function TabContainer({ children, dir }) {
   return (
      <Typography component="div" dir={dir} style={{ padding: 8 * 3, overflowX: 'hidden' }}>
         {children}
      </Typography>
   );
}

const toDataURL = url => fetch(url)
   .then(response => response.blob())
   .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
   }))

export default class CMS extends Component {
   constructor(props){
      super(props)
      
      // this.formCampaing = this.props.location.state.form;
		let date = moment(new Date, 'YYYY/MM/DD hh:mm a');
		let año = date.year();
		let mes = date.month() + 1;
		let dia = date.dates();
		let hora = date.hours();
      let minutos = date.minute();
      this.stateCampaing = this.props.location.state;
      this.state = {
         data: [],
         value:0,
         valueLang:0,
         valueViewsFormat:0,
         checkedB: true,
         displayColorPickerButtonStyle: false,
         displayColorPickerButtonFontStyle:false,
         displayColorPickerBackgroundStyle: false,
         displayColorPickerFormStyle: false,
         displayColorPickerTitleStyle: false,
         displayColorPickerFontStyle: false,
         countImgs:1,
         termsConditions:true,
         dataAPZones:[],
         spinnerState:false,
         form:{
            //campaña
            user_location:localStorage.user_location,
            id_campaing: this.stateCampaing.id_campaing,
            nombre_campaña: "",
            campaingForDelete:"",
				fecha_inicio: (año) + '-' + (mes) + '-' + (dia) + " " + (hora) + ":" + (minutos) + ":00",
				fecha_fin: (año) + '-' + (mes) + '-' + (dia) + " " + (hora) + ":" + (minutos) + ":00",
				descripcion: "",
				zona_ap: "",
				anio: año,
            vertical_economica:"",
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
            buttonColors:{
               r:'155',
               g:'155',
               b:'155',
               a:'1',
            },
            buttonColorsFont:{
               r:'155',
               g:'155',
               b:'155',
               a:'1',
            },
            backgroundColorForm:{
               r:'0',
               g:'0',
               b:'0',
               a:'0.7',
            },
            colorTitleForm:{
               r:'0',
               g:'0',
               b:'0',
               a:'1',
            },
            colorFontForm:{
               r:'0',
               g:'0',
               b:'0',
               a:'1',
            },
            backgroundColor:{
               r:'0',
               g:'0',
               b:'0',
               a:'1',
            },
            filesBanner: [],
            imgsBannerSwitch:false,
            imgBackgroundPreviewUrl:null,
            static_form:false,
            type_form_one:true,
            type_form_two:false,
            type_form_three:false,
            type_banner_one:true,
            type_banner_two:false,
            weather_widget:false
         },
      }
      this.handleChangeCheckBox = this.handleChangeCheckBox.bind(this)
      this.rteChangeEsp = this.rteChangeEsp.bind(this)
      this.rteChangeEng = this.rteChangeEng.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.handleChangeDate = this.handleChangeDate.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleChangeTerms = this.handleChangeTerms.bind(this)
      this.settingValuesFormEdit = this.settingValuesFormEdit.bind(this)
      this.handleSubmitEdit = this.handleSubmitEdit.bind(this)
      this.handleChangeTypeForms = this.handleChangeTypeForms.bind(this)
   }

   async componentDidMount(){
      const { 
         id_campaing,
       } = this.state.form
      const id_location = localStorage.user_location
      try {
			let res = await fetch(`${localStorage.urlDomain}api/zonas/${id_location}`)
			let dataAPZones = await res.json()
			this.setState({
				dataAPZones: dataAPZones,
				form: {
					...this.state.form,
					id_location: id_location
					
				}
			})
		} catch (error) {
			this.setState({
				error
			})
      }
      if(id_campaing != 0){
         
      this.settingValuesFormEdit(id_campaing)
      }
   }

   

   async settingValuesFormEdit(id_campaing){
         this.setState({
            spinnerState:true
         })
         let res = await fetch(`${localStorage.urlDomain}api/campanias/${id_campaing}/edit`);
         let dataCampaing = await res.json();
         const urlDomain = localStorage.getItem('urlDomain')
         let newState = {};
         dataCampaing[1].forEach(function(column, i) {
            // console.log("En el índice " + i + " hay este valor: " + column.COLUMN_NAME);
            
            if(column.COLUMN_NAME == 'estado_nombre'){
              Object.assign(newState, {nombre: true})
            }
            if(column.COLUMN_NAME == 'estado_apellidos'){
              Object.assign(newState, {apellidos: true})
            }
            if(column.COLUMN_NAME == 'estado_email'){
               Object.assign(newState, {email: true})
            }
            if(column.COLUMN_NAME == 'estado_edad'){
               Object.assign(newState, {edad: true})
            }
            if(column.COLUMN_NAME == 'estado_genero'){
               Object.assign(newState, {genero: true})
            }
            if(column.COLUMN_NAME == 'estado_telefono'){
               Object.assign(newState, {telefono: true})
            }
            if(column.COLUMN_NAME == 'estado_num_voucher'){
               Object.assign(newState, {num_voucher: true})
            }
            if(column.COLUMN_NAME == 'estado_num_habitacion'){
               Object.assign(newState, {num_habitacion: true})
            }
            if(column.COLUMN_NAME == 'estado_razon_visita'){
               Object.assign(newState, {razon_visita: true})
            }
         });
         if(!newState.email){
            Object.assign(newState, {email: false})
         }
         if(!newState.nombre){
            Object.assign(newState, {nombre: false})
         }
         if(!newState.apellidos){
            Object.assign(newState, {apellidos: false})
         }
         if(!newState.edad){
            Object.assign(newState, {edad: false})
         }
         if(!newState.genero){
            Object.assign(newState, {genero: false})
         }
         if(!newState.telefono){
            Object.assign(newState, {telefono: false})
         }
         if(!newState.num_voucher){
            Object.assign(newState, {num_voucher: false})
         }
         if(!newState.num_habitacion){
            Object.assign(newState, {num_habitacion: false})
         }
         if(!newState.razon_visita){
            Object.assign(newState, {razon_visita: false})
         }
       

         let widthMovilToInt = parseInt(dataCampaing[0].width_logo_movil)
         let widthWebToInt = parseInt(dataCampaing[0].width_logo_web)

         let buttonColor = dataCampaing[0].button_background_color
         let cleanRGBAButtonString = buttonColor.replace(/([rgba( )])/g,'')
         cleanRGBAButtonString = cleanRGBAButtonString.split(',')

         let buttonColorFont = dataCampaing[0].button_font_color
         let cleanRGBAButtonFontString = buttonColorFont.replace(/([rgba( )])/g,'')
         cleanRGBAButtonFontString = cleanRGBAButtonFontString.split(',')

         let backgroundColorForm = dataCampaing[0].container_form_color
         let cleanRGBABackgroundFormString = backgroundColorForm.replace(/([rgba( )])/g,'')
         cleanRGBABackgroundFormString = cleanRGBABackgroundFormString.split(',')

         let colorTitleForm = dataCampaing[0].color_title_portal
         let cleanRGBATitleFormString = colorTitleForm.replace(/([rgba( )])/g,'')
         cleanRGBATitleFormString = cleanRGBATitleFormString.split(',')

         let colorFontForm = dataCampaing[0].container_form_font_color
         let cleanRGBAFontFormString = colorFontForm.replace(/([rgba( )])/g,'')
         cleanRGBAFontFormString = cleanRGBAFontFormString.split(',')

         let backgroundColor = dataCampaing[0].color_background
         // console.log(backgroundColor);
         let cleanRGBABackground = "";
         
         if(typeof backgroundColor == 'undefined' || backgroundColor == null){
            cleanRGBABackground=["0","0","0","0.5"];
         }else{
            cleanRGBABackground = backgroundColor.replace(/([rgba( )])/g,'')
            cleanRGBABackground = cleanRGBABackground.split(',')
            
         }
         

         const db = localStorage.getItem('user_database')
         console.log(urlDomain+'portales/'+dataCampaing[0].campania+dataCampaing[0].background);
         if((db == 'portal_oxohotel' && dataCampaing[0].id_campaing != 2) || (db == 'unicentro' &&  (dataCampaing[0].id_campaing != 1 && dataCampaing[0].id_campaing != 2)) || (db != 'unicentro' && db != 'portal_oxohotel')){
            toDataURL(urlDomain+'portales/'+dataCampaing[0].campania+dataCampaing[0].background)
            .then(dataUrl => {
               this.setState({
                  form:{
                     ...this.state.form,
                     fileBackground:dataUrl
                  }
               })
            })
            toDataURL(urlDomain+'portales/'+dataCampaing[0].campania+dataCampaing[0].logo)
            .then(dataUrl => {

               this.setState({
                  form:{
                     ...this.state.form,
                     fileLogo:dataUrl
                  }
               })
            })
         }
         if(db == 'unicentro' && dataCampaing[0].id_campaing == 1){
            let urlUnicentro = "https://www.unicentro.ipwork.io/";
            this.setState({
               form:{
                  ...this.state.form,
                  fileBackground:urlUnicentro+dataCampaing[0].campania+dataCampaing[0].background,
                  fileLogo:urlUnicentro+dataCampaing[0].campania+dataCampaing[0].logo
               }
            })
         }
         if(db == 'unicentro' && dataCampaing[0].id_campaing == 2){
            let urlUnicentro = "https://www.unicentro.ipwork.io/";
            this.setState({
               form:{
                  ...this.state.form,
                  fileBackground:urlUnicentro+dataCampaing[0].campania+dataCampaing[0].background,
                  fileLogo:urlUnicentro+dataCampaing[0].campania+dataCampaing[0].logo
               }
            })
         }
         
         if(db == 'portal_oxohotel' && dataCampaing[0].id_campaing == 2){
            let urlErmita = "https://www.oxohotel.ipwork.io/";
            this.setState({
               form:{
                  ...this.state.form,
                  fileBackground:urlErmita+dataCampaing[0].campania+dataCampaing[0].background,
                  fileLogo:urlErmita+dataCampaing[0].campania+dataCampaing[0].logo
               }
            })
         }
         let date = moment(new Date, 'YYYY/MM/DD hh:mm a');
         let anio = date.year();
         
         if(dataCampaing[0].static_form == 1){
        
            this.setState({
               form:{
                  ...this.state.form,
                  static_form:true,
               }
            })

         }

         if(dataCampaing[0].type_form == 1){
        
            this.setState({
               form:{
                  ...this.state.form,
                  type_form_one:true,
                  type_form_two:false,
                  type_form_three:false,
               }
            })

         }
         if(dataCampaing[0].type_form == 2){
            this.setState({
               form:{
                  ...this.state.form,
                  type_form_one:false,
                  type_form_two:true,
                  type_form_three:false,
               }
            })

         }
         if(dataCampaing[0].type_form == 3){
            this.setState({
               form:{
                  ...this.state.form,
                  type_form_one:false,
                  type_form_two:false,
                  type_form_three:true,
               }
            })

         }
         if(dataCampaing[0].type_banner == 1){
            this.setState({
               form:{
                  ...this.state.form,
                  imgsBannerSwitch:true,
                  type_banner_one:true,
                  type_banner_two:false,
               }
            })
           
         }

         if(dataCampaing[0].type_banner == 2){
            this.setState({
               form:{
                  ...this.state.form,
                  imgsBannerSwitch:true,
                  type_banner_two:true,
                  type_banner_one:false,
               }
            })
           
         }

         if(dataCampaing[0].weather_widget == 1){
            this.setState({
               form:{
                  ...this.state.form,
                  weather_widget:true,
               }
            })
           
         }
         
            this.setState({
            spinnerState:false,
            form: {
               ...this.state.form,
               email: newState.email,
               nombre: newState.nombre,
               apellidos: newState.apellidos,
               edad: newState.edad,
               genero: newState.genero,
               telefono: newState.telefono,
               num_voucher: newState.num_voucher,
               num_habitacion: newState.num_habitacion,
               razon_visita: newState.razon_visita,
               nombre_campaña: dataCampaing[0].nombre,
               campaingForDelete: dataCampaing[0].campania,
               anio:anio,
               fecha_inicio: dataCampaing[0].fecha_inicio,
               fecha_fin: dataCampaing[0].fecha_fin,
               descripcion: dataCampaing[0].descripcion,
               zona_ap: dataCampaing[0].zona_ap,
               vertical_economica: dataCampaing[0].vertical_economica,
               terminos_condiciones_esp: dataCampaing[0].terms_conditions_es,
               terminos_condiciones_eng:dataCampaing[0].terms_conditions_en,
               titlePortal: dataCampaing[0].title_portal,
               sizeLogoMobile: widthMovilToInt,
               sizeLogoWeb: widthWebToInt,
               // fileBackground:urlUnicentro,
               // fileLogo:urlLogo,
              
               buttonColors: {
                  r:cleanRGBAButtonString[0],
                  g:cleanRGBAButtonString[1],
                  b:cleanRGBAButtonString[2],
                  a:cleanRGBAButtonString[3],
               },
               buttonColorsFont: {
                  r:cleanRGBAButtonFontString[0],
                  g:cleanRGBAButtonFontString[1],
                  b:cleanRGBAButtonFontString[2],
                  a:cleanRGBAButtonFontString[3],
               },
               backgroundColorForm:{
                  r:cleanRGBABackgroundFormString[0],
                  g:cleanRGBABackgroundFormString[1],
                  b:cleanRGBABackgroundFormString[2],
                  a:cleanRGBABackgroundFormString[3],
               },
               colorTitleForm:{
                  r:cleanRGBATitleFormString[0],
                  g:cleanRGBATitleFormString[1],
                  b:cleanRGBATitleFormString[2],
                  a:cleanRGBATitleFormString[3],
               },
               colorFontForm:{
                  r:cleanRGBAFontFormString[0],
                  g:cleanRGBAFontFormString[1],
                  b:cleanRGBAFontFormString[2],
                  a:cleanRGBAFontFormString[3],
               },
               backgroundColor:{
                  r:cleanRGBABackground[0],
                  g:cleanRGBABackground[1],
                  b:cleanRGBABackground[2],
                  a:cleanRGBABackground[3],
               },

               
          
            }
         });
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

   
   handleClickButtonStyle = () =>{
      this.setState({
         displayColorPickerButtonStyle: !this.state.displayColorPickerButtonStyle,
         displayColorPickerButtonFontStyle: false,
         displayColorPickerBackgroundStyle: false,
         displayColorPickerFormStyle: false,
         displayColorPickerTitleStyle: false,
         displayColorPickerFontStyle: false,
      })
   }
   handleClickButtonFontStyle = () =>{
      this.setState({
         displayColorPickerButtonFontStyle: !this.state.displayColorPickerButtonFontStyle,
         displayColorPickerButtonStyle: false,
         displayColorPickerBackgroundStyle: false,
         displayColorPickerFormStyle: false,
         displayColorPickerTitleStyle: false,
         displayColorPickerFontStyle: false,
      })
   }
   handleClickBackgroundStyle = () =>{
      this.setState({
         displayColorPickerBackgroundStyle: !this.state.displayColorPickerBackgroundStyle,
         displayColorPickerButtonStyle: false,
         displayColorPickerButtonFontStyle: false,
         displayColorPickerFormStyle: false,
         displayColorPickerTitleStyle: false,
         displayColorPickerFontStyle: false,
      })
   }
   handleClickFormStyle = () =>{
      this.setState({
         displayColorPickerFormStyle: !this.state.displayColorPickerFormStyle,
         displayColorPickerButtonStyle: false,
         displayColorPickerButtonFontStyle: false,
         displayColorPickerBackgroundStyle: false,
         displayColorPickerTitleStyle: false,
         displayColorPickerFontStyle: false,
      })
   }
   handleClickTitleStyle = () =>{
      this.setState({
         displayColorPickerTitleStyle: !this.state.displayColorPickerTitleStyle,
         displayColorPickerButtonStyle: false,
         displayColorPickerButtonFontStyle: false,
         displayColorPickerBackgroundStyle: false,
         displayColorPickerFormStyle: false,
         displayColorPickerFontStyle: false,
      })
   }
   handleClickFontStyle = () =>{
      this.setState({
         displayColorPickerFontStyle: !this.state.displayColorPickerFontStyle,
         displayColorPickerButtonStyle: false,
         displayColorPickerButtonFontStyle: false,
         displayColorPickerBackgroundStyle: false,
         displayColorPickerFormStyle: false,
         displayColorPickerTitleStyle: false,
      })
   }


   handleChangeColorButtonStyle = (color) => {
      this.setState({
        form:{
           ...this.state.form,
           buttonColors: color.rgb
        }
      })
   }
   handleChangeColorButtonFontStyle = (color) => {
      this.setState({
        form:{
           ...this.state.form,
           buttonColorsFont: color.rgb
        }
      })
   }
   handleChangeColorBackgroundStyle = (color) => {
      this.setState({
        form:{
           ...this.state.form,
           backgroundColor: color.rgb
        }
      })
   }
   handleChangeColorFormStyle = (color) => {
      this.setState({
        form:{
           ...this.state.form,
           backgroundColorForm: color.rgb
        }
      })
   }
   handleChangeColorTitleStyle = (color) => {
      this.setState({
        form:{
           ...this.state.form,
           colorTitleForm: color.rgb
        }
      })
   }
   handleChangeColorFontStyle = (color) => {
      this.setState({
        form:{
           ...this.state.form,
           colorFontForm: color.rgb
        }
      })
   }

   
   handleCloseButtonStyle = () =>{
      this.setState({
         displayColorPickerButtonStyle:false
      })
   }
   handleCloseButtonFontStyle = () =>{
      this.setState({
         displayColorPickerButtonFontStyle:false
      })
   }
   handleCloseBackgroundStyle = () =>{
      this.setState({
         displayColorPickerBackgroundStyle:false
      })
   }
   handleCloseFormStyle = () =>{
      this.setState({
         displayColorPickerFormStyle:false
      })
   }
   handleCloseTitleStyle = () =>{
      this.setState({
         displayColorPickerTitleStyle:false
      })
   }
   handleCloseFontStyle = () =>{
      this.setState({
         displayColorPickerFontStyle:false
      })
   }

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
      }
      else if(name== 'imgsBannerSwitch') {
         if(event.target.checked != false){
            
            this.setState({
               form:{
                  ...this.state.form,
                  imgsBannerSwitch: event.target.checked,
                  // type_banner_one:true,
               }
            });
         }else{
            this.state.form.filesBanner = [];
            this.setState({
               form:{
                  ...this.state.form,
                  imgsBannerSwitch: event.target.checked,
               }
            });
         }
      }
      else if(name == 'type_banner_one'){
         if(event.target.checked != false){
            this.setState({
               form:{
                  ...this.state.form,
                  type_banner_one: event.target.checked,
                  type_banner_two: false 
               }
            });
         }
         else{
            this.setState({
               form:{
                  ...this.state.form,
                  type_banner_one: event.target.checked,
                  type_banner_two: false 
               }
            });
         }
      }
      else if(name == 'type_banner_two'){
         if(event.target.checked != false){
            this.setState({
               form:{
                  ...this.state.form,
                  type_banner_two: event.target.checked,
                  type_banner_one: false 
               }
            });
         }
         else{
            this.setState({
               form:{
                  ...this.state.form,
                  type_banner_two: event.target.checked,
                  type_banner_one: false 
               }
            });
         }
      }
      
   
      else{
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

   handleChangeDate(e, name=null){
      if(e.target){
         this.setState({
            form:{
               ...this.state.form,
               [e.target.name]: e.target.value
            }
         })
      }
      else if(e._d){
         let date = moment(e._d, 'YYYY/MM/DD hh:mm a');
         let año = date.year();
         let mes = date.month()+1;
         let dia = date.date();
         let hora = date.hour();
         let minutos = date.minute();
         this.setState({
            form:{
               ...this.state.form,
               [name]: (año) + '-' + (mes) + '-' + (dia) + " " + (hora) + ":" + (minutos)
            }
         })
      }
   }

   handleChange(e){
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
      else{
         this.setState({
            form:{
               ...this.state.form,
               [e.target.name]: e.target.value
            }
         })
      }
     
   }

   handleChangeBannerImgs(imgs){
      // console.log(imgs.getAsDataURL())
      // if(this.state.countImgs <= 5){
         let files = imgs;
         let reader = new FileReader();
         reader.readAsDataURL(files)
         reader.onload=(e)=>{
            this.setState(state =>{
               const filesBanner = state.form.filesBanner.push(e.target.result)
               return {
                  filesBanner
               };
            })
           // this.setState({
            //   countImgs: this.state.countImgs+1
            //})
         }
      // }
      // else{
      //    NotificationManager.error('El número de imagenes ha excedido el límite (Max 5)','',5000);
      // }

   }

   handleRemoveFile(imgs){

      let files = imgs;
      let reader = new FileReader();
      reader.readAsDataURL(files)

      reader.onload=(e)=>{
         this.setState(state =>{
            const filesBanner =  state.form.filesBanner;
            filesBanner.splice(filesBanner.indexOf(e.target.result), 1);
            return {
               filesBanner
            }
         })
      }
   }
  
  
   async handleSubmit(e){
      e.preventDefault();
      this.setState({
         spinnerState:true
      })
      const { form } = this.state;
   
      if(((form.nombre_campaña == '' || form.descripcion == '')) || ((form.zona_ap == '') || (form.anio == ''))){
         this.setState({
            spinnerState:false
         })
         NotificationManager.error('Los campos son obligatorios','',5000);
      }
      else if((form.terminos_condiciones_esp == '' || form.terminos_condiciones_eng == '') || (form.terminos_condiciones_esp == '<p><br></p>' || form.terminos_condiciones_eng == '<p><br></p>')){
         NotificationManager.error('Los terminos y condiciones son requeridos','',5000);
      }
      else if(/[-!$%^&*()_+|~=`\\#{}\[\]:";'<>?,.Ññ\/]/.test(form.nombre_campaña)){
         this.setState({
            spinnerState:false
         })
         NotificationManager.error('No se permiten caracteres especiales','',5000);
      }
      else if(((form.sizeLogoMobile == "" || (form.sizeLogoWeb == "" || form.buttonColors == "")) || (form.colorTitleForm == "" || form.colorFontForm == "")) && !form.static_form){
         this.setState({
            spinnerState:false
         })
         NotificationManager.error('Todos los campos son obligatorios','',5000);
      } 
      else if(((form.titlePortal == "" || form.fileLogo == "") || form.fileBackground == "")){
         this.setState({
            spinnerState:false
         })
         NotificationManager.error('Todos los campos son obligatorios','',5000);
      }
      else if(form.imgsBannerSwitch == true && form.filesBanner.length <= 3){
         this.setState({
            spinnerState:false
         })
         NotificationManager.error('La cantidad mínima de imagenes es requerida (Min 4)','',5000);
      }
      else{
         try {
            
         } catch (error) {
            
         }
         let config = {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(this.state.form)
			};

         let res = await fetch(`${localStorage.urlDomain}api/campanias`, config);
         let dataCampaing = await res.json();
         
         if(dataCampaing.message == 500){
            this.setState({
               spinnerState:false
            })
            NotificationManager.error('El nombre de campaña ya existe, por favor intente con otro nombre','',5000);
         }
         if(dataCampaing.message == 200){
            this.setState({
               spinnerState:false
            })
            this.props.history.goBack();
            NotificationManager.success('Campaña creada satisfactoriamente!','',5000);
         }
      }
   }

   async handleSubmitEdit(e){
      e.preventDefault();
      this.setState({
         spinnerState:true
      })
      const { form } = this.state;
   
      if((form.nombre_campaña == "" || form.descripcion == "") || (form.zona_ap == "")){
         this.setState({
            spinnerState:false
         })
         NotificationManager.error('Los campos son obligatorios','',5000);
            
      }
      else if((form.terminos_condiciones_esp == "" || form.terminos_condiciones_eng == "") || (form.terminos_condiciones_esp == '<p><br></p>' || form.terminos_condiciones_eng == '<p><br></p>')){
         this.setState({
            spinnerState:false
         })
         NotificationManager.error('Los terminos y condiciones son requeridos',"",5000);
      }
      else if(/[-!$%^&*()_+|~=`\\#{}\[\]:";'<>?,.Ññ\/]/.test(form.nombre_campaña)){
         this.setState({
            spinnerState:false
         })
         NotificationManager.error('No se permiten caracteres especiales','',5000);
      }
      else if(((form.sizeLogoMobile == "" || (form.sizeLogoWeb == "" || form.buttonColors == "")) || (form.colorTitleForm == "" || form.colorFontForm == "")) && !form.static_form){
         this.setState({
            spinnerState:false
         })
         NotificationManager.error('Todos los campos son obligatorios','',5000);
      } 
      else if(((form.titlePortal == "" || form.fileLogo == "") || form.fileBackground == "")){
         this.setState({
            spinnerState:false
         })
         NotificationManager.error('Todos los campos son obligatorios','',5000);
      }
      else if(form.imgsBannerSwitch == true && form.filesBanner.length <= 3){
         this.setState({
            spinnerState:false
         })
         NotificationManager.error('La cantidad mínima de imagenes es requerida (Min 4)','',5000);
      }
      else{
         try {
            let config = {
               method: 'PATCH',
               headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify(this.state.form)
            };
   
            let res = await fetch(`${localStorage.urlDomain}api/campanias/` + form.id_campaing, config);
            let dataCampaing = await res.json();
            if(dataCampaing.message == 500){
               this.setState({
                  spinnerState:false
               })
               NotificationManager.error('El nombre de campaña ya existe, por favor intente con otro nombre','',5000);
            }
            if(dataCampaing.message == 200){
               this.setState({
                  spinnerState:false
               })
               this.props.history.goBack();
               NotificationManager.success('Campaña editada satisfactoriamente!','',5000);
            }
         } catch (error) {
            console.log(error);
         }
         
      }
   }

   handleChangeTerms = () =>{
      if(!this.state.termsConditions){
         this.setState({
            termsConditions: true
         })
      }else{
         this.setState({
            termsConditions: false
         })
      }
      
   }

   handleChangeTypeForms(type){
      if(type == 1){
         this.setState({
            form:{
               ...this.state.form,
               type_form_one:true,
               type_form_two:false,
               type_form_three:false,
               static_form:false
            }
           
         })
      }
      if(type == 2){
         this.setState({
            form:{
               ...this.state.form,
               type_form_one:false,
               type_form_two:true,
               type_form_three:false
            }
           
         })
      }
      if(type == 3){
         this.setState({
            form:{
               ...this.state.form,
               type_form_one:false,
               type_form_two:false,
               type_form_three:true
            }
           
         })
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
         spinnerState,
         form
      } = this.state;
    
      const { dataAPZones } = this.state

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
               backgroundColor: `rgb(150, 150, 150)`,
               opacity: 1,
               border: 'none',
             },
           },
           '&$focusVisible $thumb': {
             color:  `rgb(150, 150, 150)`,
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

       const stylesButtonColorPicker = reactCSS({
         'default': {
            color: {
              width: '100%',
              height: '12px',
              borderRadius: '2px',
              border: '0.04em solid rgba(255,255,255,0.5)',
              background: `rgba(${form.buttonColors.r }, ${form.buttonColors.g }, ${form.buttonColors.b }, ${form.buttonColors.a })`,
            },
            swatch: {
              padding: '5px',
              background: '#2c3644',
              borderRadius: '1px',
              boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
              display: 'inline-block',
              cursor: 'pointer',
            },
            popover: {
              position: 'absolute',
              zIndex: '100',
              top:'50px',
              left:'17px'
            },
            cover: {
              position: 'fixed',
              top: '0px',
              right: '0px',
              bottom: '0px',
              left: '0px',
            },
          },
       })

       const stylesButtonFontColorPicker = reactCSS({
         'default': {
            color: {
              width: '100%',
              height: '12px',
              borderRadius: '2px',
              border: '0.04em solid rgba(255,255,255,0.5)',
              background: `rgba(${form.buttonColorsFont.r }, ${form.buttonColorsFont.g }, ${form.buttonColorsFont.b }, ${form.buttonColorsFont.a })`,
            },
            swatch: {
              padding: '5px',
              background: '#2c3644',
              borderRadius: '1px',
              boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
              display: 'inline-block',
              cursor: 'pointer',
            },
            popover: {
              position: 'absolute',
              zIndex: '100',
              top:'50px',
              left:'17px'
            },
            cover: {
              position: 'fixed',
              top: '0px',
              right: '0px',
              bottom: '0px',
              left: '0px',
            },
          },
       })

       const stylesColorPicker = reactCSS({
         'default': {
            color: {
              width: '100%',
              height: '12px',
              borderRadius: '2px',
              border: '0.04em solid rgba(255,255,255,0.5)',
              background: `rgba(${form.backgroundColorForm.r }, ${form.backgroundColorForm.g }, ${form.backgroundColorForm.b }, ${form.backgroundColorForm.a })`,
            },
            swatch: {
              padding: '5px',
              background: '#2c3644',
              borderRadius: '1px',
              boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
              display: 'inline-block',
              cursor: 'pointer',
            },
            popover: {
              position: 'absolute',
              zIndex: '100',
              top:'50px',
              left:'17px'
            },
            cover: {
              position: 'fixed',
              top: '0px',
              right: '0px',
              bottom: '0px',
              left: '0px',
            },
          },
       })

       const stylesTitleColorPicker = reactCSS({
         'default': {
            color: {
              width: '100%',
              height: '12px',
              borderRadius: '2px',
              border: '0.04em solid rgba(255,255,255,0.5)',
              background: `rgba(${form.colorTitleForm.r }, ${form.colorTitleForm.g }, ${form.colorTitleForm.b }, ${form.colorTitleForm.a })`,
            },
            swatch: {
              padding: '5px',
              background: '#2c3644',
              borderRadius: '1px',
              boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
              display: 'inline-block',
              cursor: 'pointer',
            },
            popover: {
              position: 'absolute',
              zIndex: '100',
              top:'50px',
              left:'17px'
            },
            cover: {
              position: 'fixed',
              top: '0px',
              right: '0px',
              bottom: '0px',
              left: '0px',
            },
          },
       })

       const stylesFontColorPicker = reactCSS({
         'default': {
            color: {
              width: '100%',
              height: '12px',
              borderRadius: '2px',
              border: '0.04em solid rgba(255,255,255,0.5)',
              background: `rgba(${form.colorFontForm.r }, ${form.colorFontForm.g }, ${form.colorFontForm.b }, ${form.colorFontForm.a })`,
            },
            swatch: {
              padding: '5px',
              background: '#2c3644',
              borderRadius: '1px',
              boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
              display: 'inline-block',
              cursor: 'pointer',
            },
            popover: {
              position: 'absolute',
              zIndex: '100',
              top:'50px',
              left:'17px'
            },
            cover: {
              position: 'fixed',
              top: '0px',
              right: '0px',
              bottom: '0px',
              left: '0px',
            },
          },
       })

       const stylesBackgroundColorPicker = reactCSS({
         'default': {
            color: {
              width: '100%',
              height: '12px',
              borderRadius: '2px',
              border: '0.04em solid rgba(255,255,255,0.5)',
              background: `rgba(${form.backgroundColor.r }, ${form.backgroundColor.g }, ${form.backgroundColor.b }, ${form.backgroundColor.a })`,
            },
            swatch: {
              padding: '5px',
              background: '#2c3644',
              borderRadius: '1px',
              boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
              display: 'inline-block',
              cursor: 'pointer',
            },
            popover: {
              position: 'absolute',
              zIndex: '100',
              top:'50px',
              left:'18px'
            },
            cover: {
              position: 'fixed',
              top: '0px',
              right: '0px',
              bottom: '0px',
              left: '0px',
            },
          },
       })

      // const config = this.componentConfig;
      // const djsConfig = this.djsConfig;

      // For a list of all possible events (there are many), see README.md!
      var componentConfig = { iconFiletypes: ['.jpg', '.png', '.gif'], showFiletypeIcon: false, postUrl: 'no-url' };
      var djsConfig = { acceptedFiles: "image/jpeg,image/png,image/gif", autoProcessQueue: true, addRemoveLinks: true, dictRemoveFile:"Remover Imagen" }

      var eventHandlers = { addedfile: (file) => this.handleChangeBannerImgs(file), removedfile: (file) => this.handleRemoveFile(file) }

      return (
         <div>
            {spinnerState ? 
               <FullScreenLoader />
               :
               <div>

               </div>
            }
            <PageTitleBar 
               title={ 'CMS - '+ form.nombre_campaña } 
               match={this.props.match} 
               history={this.props.history}
            />
               
            <Card variant="outlined" style={{marginBottom:"20px"}}>
               <div className="row">
                     <div className="col-lg-6">
                        <CardContent>
                           <div className="Tab-wrap" style={{padding:"1px"}}>
                              {/* border: "0.3px solid #c1c1c1 !important",borderRadius:"6px !important", padding: "20px!important", */}
                              <AppBar position="static" >
                                 <Tabs
                                    value={this.state.value}
                                    onChange={this.handleChangeTabs}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    variant="standard"
                                 >
                                    <Tab label={'Campaña'} />
                                    <Tab label={'Formulario'} />
                                    <Tab label={'Diseño'} />
                                    <Tab label={'Imagenes'} />
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
                                          <div className="row" style={{backgroundColor: "#404e77",padding: "30px 30px 66px 30px",marginRight: "1px"}}>
                                             <div className="col-lg-12">
                                                <p className="customTitles">Cree Su Propia Campaña</p>
                                             </div>
                                             <div className="col-lg-6">
                                                <FormGroup className="customMarginInputs">
                                                   <Label for="nombre_campaña">Nombre Campaña</Label>
                                                   <Input type="text" autoComplete="off" name="nombre_campaña" id="nombre_campaña" value={form.nombre_campaña} onChange={() => this.handleChange(event)} placeholder="Nombre Campaña" />
                                                </FormGroup>
                                                <DateTimePicker
                                                   className="has-input has-input-lg"
                                                   key="fecha_inicio"
                                                   label="Fecha Inicio"
                                                   required
                                                   value={form.fecha_inicio}
                                                   format="YYYY/MM/DD hh:mm a"
                                                   onChange={(event) => this.handleChangeDate(event, 'fecha_inicio')}
                                                   animateYearScrolling={false}
                                                   leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                                                   rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                                                   showTodayButton={true}
                                                />
                                                
                                                </div>
                                                <div className="col-lg-6">
                                                   <FormGroup className="customMarginInputs">
                                                      <Label for="zona_ap">Zona AP</Label>
                                                      <Select name="zona_ap" id="zona_ap" native onChange={() => this.handleChange(event)}
                                                         className="has-input zonaAP" value={form.zona_ap}
                                                      >
                                                         <option value="">Seleccione una zona</option>
                                                         {dataAPZones && dataAPZones.map((dataAPZones) => (

                                                            <option key={dataAPZones.id} value={dataAPZones.id}>{dataAPZones.Nombre}</option>
                                                         ))}

                                                      </Select>
                                                   </FormGroup>
                                                   <DateTimePicker
                                                      className="has-input has-input-lg"
                                                      key="fecha_fin"
                                                      label="Fecha Fin"
                                                      required
                                                      value={form.fecha_fin}
                                                      minDate={moment(form.fecha_inicio, 'YYYY/MM/DD hh:mm a')}
                                                      format="YYYY/MM/DD hh:mm a"
                                                      onChange={(event) => this.handleChangeDate(event, 'fecha_fin')}
                                                      animateYearScrolling={false}
                                                      leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                                                      rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                                                      showTodayButton={true}
                                                   />

                                                   
                                                   {/* <FormGroup> borrar la vertical economica
                                                      <Label for="vertical_economica">Vertical Economica</Label>
                                                      <Select name="vertical_economica" id="vertical_economica" native onChange={() => this.handleChange(event)}
                                                         className="has-input verticalEco" value={form.vertical_economica}
                                                      >
                                                         <option value="">Seleccione una vertical</option>
                                                         <option value='Hoteles'>Hoteles</option>
                                                         <option value='Centros Comerciales'>Centros Comerciales</option>
                                                      </Select>
                                                   </FormGroup> */}
                                                </div>
                                                <div className="col-lg-12">
                                                   <FormGroup className="customMarginTextArea">
                                                      <Label for="descripcion">Descripción</Label>
                                                      <Input type="textarea" autoComplete="off" className="textAreaResize" rows="8" name="descripcion" id="descripcion" value={form.descripcion} onChange={() => this.handleChange(event)} placeholder="Descripción" />
                                                   </FormGroup>
                                                </div> 
                                          </div>
                                       </RctCardContent>
                                    </TabContainer>
                                 </div>
                                 <div className="card mb-0 transaction-box">
                                    <TabContainer dir={theme.direction}>
                                       <RctCardContent>
                                          <div className="row" style={{backgroundColor: "#404e77",padding: "30px 30px 66px 30px",marginRight: "1px"}}>
                                             <div className="col-lg-12">
                                                <p className="customTitles">Personalice Los Campos De Su Portal Cautivo</p>
                                             </div>
                                             <div className="col-lg-6">
                                                <FormGroupUI>
                                                   <FormControlLabelUI
                                                      control={<Checkbox checked={form.email} onChange={this.handleChangeCheckBox('email')} value="email" />}
                                                      // control={<Checkbox checked={false} onChange={} value="email" />}
                                                      label="Correo"
                                                   />
                                                   <FormControlLabelUI
                                                      control={<Checkbox checked={form.nombre} onChange={this.handleChangeCheckBox('nombre')} value="nombre" />}
                                                      label="Nombres y Apellidos"
                                                   />
                                                   <FormControlLabelUI
                                                      control={<Checkbox checked={form.edad} onChange={this.handleChangeCheckBox('edad')} value="edad" />}
                                                      label="Edad"
                                                   />
                                                   <FormControlLabelUI
                                                      control={<Checkbox checked={form.genero} onChange={this.handleChangeCheckBox('genero')} value="genero" />}
                                                      label="Genero"
                                                   />
                                                </FormGroupUI>
                                             </div>

                                             <div className="col-lg-6">
                                                <FormGroupUI>
                                                   <FormControlLabelUI
                                                      control={<Checkbox checked={form.telefono} onChange={this.handleChangeCheckBox('telefono')} value="telefono" />}
                                                      label="Teléfono"
                                                   />
                                                   <FormControlLabelUI
                                                      control={<Checkbox checked={form.num_voucher} onChange={this.handleChangeCheckBox('num_voucher')} value="num_voucher" />}
                                                      label="Voucher"
                                                   />
                                                   <FormControlLabelUI
                                                      control={<Checkbox checked={form.num_habitacion} onChange={this.handleChangeCheckBox('num_habitacion')} value="num_habitacion" />}
                                                      label="Número Habitación"
                                                   />
                                                   <FormControlLabelUI
                                                      control={<Checkbox checked={form.razon_visita} onChange={this.handleChangeCheckBox('razon_visita')} value="razon_visita" />}
                                                      label="Razón Visita"
                                                   />
                                                </FormGroupUI>
                                             </div>
                                             <div className="col-lg-12" style={{marginTop:"15px"}}>
                                                <h4 className="termsCon" onClick={this.handleChangeTerms}>Terminos y Condiciones</h4>
                                                {this.state.termsConditions?
                                                <div className="Tab-wrap">
                                                   <AppBar position="static" >
                                                      <Tabs
                                                         value={this.state.valueLang}
                                                         onChange={this.handleChangeTabsLang}
                                                         indicatorColor="primary"
                                                         textColor="primary"
                                                         variant="standard"
                                                      >
                                                         <Tab label={'Español'} />
                                                         <Tab label={'Inglés'} />
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
                                                            <ReactQuill theme="snow" modules={modules} formats={formats} value={form.terminos_condiciones_esp} 
                                                               onChange={this.rteChangeEsp}/>
                                                         </div>
                                                         </RctCardContent>
                                                      </TabContainer>
                                                   </div>
                                                   <div className="card mb-0 transaction-box">
                                                      <TabContainer dir={themeLang.direction}>
                                                         <RctCardContent>
                                                         <div className="editor-wrapper">
                                                            <ReactQuill theme="snow" modules={modules} formats={formats} value={form.terminos_condiciones_eng} 
                                                               onChange={this.rteChangeEng}/>
                                                         </div>
                                                         </RctCardContent>
                                                      </TabContainer>
                                                   </div>
                                                   </SwipeableViews>
                                                </div>
                                                   :
                                                <div></div>
                                                }
                                                
                                             </div>
                                          </div>
                                       </RctCardContent>
                                    </TabContainer>
                                 </div>
                                 <div className="card mb-0 transaction-box">
                                    <TabContainer dir={theme.direction}>
                                       <RctCardContent>
                                          <div className="row" style={{backgroundColor: "#404e77",padding: "30px 30px 120px 30px",marginRight: "1px"}}>
                                             <div className="col-lg-12">
                                                <p className="customTitles">Agregue Un Poco de Diseño</p>
                                             </div>

                                             {form.type_form_one 
                                             ? 
                                             <div className="row col-lg-12" style={{display:"contents"}}>
                                                <div className="col-lg-4">
                                                   <label class="btn btn-info active" onClick={() => this.handleChangeTypeForms(1)}>
                                                      Diseño 1
                                                   </label>
                                                </div>
                                                <div className="col-lg-4">
                                                <label class="btn btn-secondary"  onClick={() => this.handleChangeTypeForms(2)}>
                                                   Diseño 2
                                                </label>
                                                </div>
                                                <div className="col-lg-4">
                                                   <label class="btn btn-primary"  onClick={() => this.handleChangeTypeForms(3)}>
                                                      Diseño 3
                                                   </label>
                                                </div>
                                             </div>
                                             : form.type_form_two ?  
                                             <div className="row col-lg-12" style={{display:"contents"}}>
                                                <div className="col-lg-4">
                                                   <label class="btn btn-info "  onClick={() => this.handleChangeTypeForms(1)}>
                                                      Diseño 1
                                                   </label>
                                                </div>
                                                <div className="col-lg-4">
                                                <label class="btn btn-secondary active"  onClick={() => this.handleChangeTypeForms(2)}>
                                                   Diseño 2
                                                </label>
                                                </div>
                                                <div className="col-lg-4">
                                                   <label class="btn btn-primary"  onClick={() => this.handleChangeTypeForms(3)}>
                                                      Diseño 3
                                                   </label>
                                                </div>
                                             </div>
                                             :
                                             <div className="row col-lg-12" style={{display:"contents"}}>
                                                <div className="col-lg-4">
                                                   <label class="btn btn-info"  onClick={() => this.handleChangeTypeForms(1)}>
                                                      Diseño 1
                                                   </label>
                                                </div>
                                                <div className="col-lg-4">
                                                <label class="btn btn-secondary"  onClick={() => this.handleChangeTypeForms(2)}>
                                                   Diseño 2
                                                </label>
                                                </div>
                                                <div className="col-lg-4">
                                                   <label class="btn btn-primary active"  onClick={() => this.handleChangeTypeForms(3)}>
                                                      Diseño 3
                                                   </label>
                                                </div>
                                             </div>
                                             }
                                             {form.type_form_two || form.type_form_three ?
                                                <div className="col-lg-12">
                                                   <FormControlLabelUI style={{margin: "0 auto", paddingBottom: '20px' }}
                                                      control={<Checkbox checked={form.static_form} onChange={this.handleChangeCheckBox('static_form')} value="static_form" />}
                                                      label="Diseño estático"
                                                   />
                                                </div>
                                                :
                                                <div className="col-lg-12" style={{margin: "0 auto", paddingBottom: '20px' }}></div>
                                             }

                                             {(!form.type_form_two || !form.type_form_three) && !form.static_form  ?
                                                <div style={{display:"contents"}}>
                                                   <div className="customMarginInputs col-lg-6">
                                                      <Label for="colorFontForm">Color de Terminos y Condiciones</Label>
                                                      <div style={ stylesFontColorPicker.swatch } onClick={ this.handleClickFontStyle } className="inputColor">
                                                         <div style={ stylesFontColorPicker.color } />
                                                      </div>
                                                      { this.state.displayColorPickerFontStyle ? <div style={ stylesFontColorPicker.popover }>
                                                      <div style={ stylesFontColorPicker.cover } onClick={ this.handleCloseFontStyle } className="inputColor" />
                                                         <SketchPicker color={ form.colorFontForm } onChange={ this.handleChangeColorFontStyle } />
                                                      </div> : null }
                                                      {/* <input type="color" autoComplete="off" name="colorFontForm" id="colorFontForm"  value={colorFontForm} onChange={() => this.handleChange(event)} className="inputColor"/> */}
                                                   </div>
                                                   
                                                   <div className="customMarginInputs col-lg-6">
                                                      <Label for="colorTitleForm">Color de Fondo del Formulario</Label>
                                                      <div style={ stylesColorPicker.swatch } onClick={ this.handleClickFormStyle } className="inputColor">
                                                         <div style={ stylesColorPicker.color } />
                                                      </div>
                                                      { this.state.displayColorPickerFormStyle ? <div style={ stylesColorPicker.popover }>
                                                      <div style={ stylesColorPicker.cover } onClick={ this.handleCloseFormStyle } className="inputColor" />
                                                         <SketchPicker color={ form.backgroundColorForm } onChange={ this.handleChangeColorFormStyle } />
                                                      </div> : null }
                                                      {/* <input type="color" autoComplete="off" name="backgroundColorForm" rgba id="backgroundColorForm" value={backgroundColorForm} onChange={() => this.handleChange(event)} className="inputColor"/> */}
                                                   </div>
                                                   <div className="customMarginInputs col-lg-6">
                                                      <Label for="colorTitleForm">Color Titulo del Formulario</Label>
                                                      <div style={ stylesTitleColorPicker.swatch } onClick={ this.handleClickTitleStyle } className="inputColor">
                                                         <div style={ stylesTitleColorPicker.color } />
                                                      </div>
                                                      { this.state.displayColorPickerTitleStyle ? <div style={ stylesTitleColorPicker.popover }>
                                                      <div style={ stylesTitleColorPicker.cover } onClick={ this.handleCloseTitleStyle } className="inputColor" />
                                                         <SketchPicker color={ form.colorTitleForm } onChange={ this.handleChangeColorTitleStyle } />
                                                      </div> : null }
                                                      {/* <input type="color" autoComplete="off" name="colorTitleForm" id="colorTitleForm" value={colorTitleForm} onChange={() => this.handleChange(event)} className="inputColor"/> */}
                                                   </div>
                                                   <div className="customMarginInputs col-lg-6">
                                                      <Label for="buttonColors">Color del Boton</Label>
                                                      <div style={ stylesButtonColorPicker.swatch } onClick={ this.handleClickButtonStyle } className="inputColor">
                                                         <div style={ stylesButtonColorPicker.color } />
                                                      </div>
                                                      { this.state.displayColorPickerButtonStyle ? <div style={ stylesButtonColorPicker.popover }>
                                                      <div style={ stylesButtonColorPicker.cover } onClick={ this.handleCloseButtonStyle } className="inputColor" />
                                                         <SketchPicker className="pickerColor" color={ form.buttonColors } onChange={ this.handleChangeColorButtonStyle } />
                                                      </div> : null }
                                                   </div>
                                                   <div className="customMarginInputs col-lg-6">
                                                      <Label for="buttonColors">Color de Fuente del Boton</Label>
                                                      <div style={ stylesButtonFontColorPicker.swatch } onClick={ this.handleClickButtonFontStyle } className="inputColor">
                                                         <div style={ stylesButtonFontColorPicker.color } />
                                                      </div>
                                                      { this.state.displayColorPickerButtonFontStyle ? <div style={ stylesButtonFontColorPicker.popover }>
                                                      <div style={ stylesButtonFontColorPicker.cover } onClick={ this.handleCloseButtonFontStyle } className="inputColor" />
                                                         <SketchPicker className="pickerColor" color={ form.buttonColorsFont } onChange={ this.handleChangeColorButtonFontStyle } />
                                                      </div> : null }
                                                   </div>
                                                   {(form.type_form_two || form.type_form_three) && !form.static_form ?
                                                   <div className="customMarginInputs col-lg-6">
                                                      <Label for="buttonColors">Color de Fondo</Label>
                                                      <div style={ stylesBackgroundColorPicker.swatch } onClick={ this.handleClickBackgroundStyle } className="inputColor">
                                                         <div style={ stylesBackgroundColorPicker.color } />
                                                      </div>
                                                      { this.state.displayColorPickerBackgroundStyle ? <div style={ stylesBackgroundColorPicker.popover }>
                                                      <div style={ stylesBackgroundColorPicker.cover } onClick={ this.handleCloseBackgroundStyle } className="inputColor" />
                                                         <SketchPicker className="pickerColor" color={ form.backgroundColor } onChange={ this.handleChangeColorBackgroundStyle } />
                                                      </div> : null }
                                                   </div>
                                                   :
                                                   <div></div>
                                                   }
                                                </div>
                                                :
                                                <div>

                                                </div>
                                             }
                                                <FormGroup className="customMarginInputs col-lg-12">
                                                   <Label for="titlePortal">Titulo Portal Cautivo</Label>
                                                   <Input type="text" autoComplete="off" name="titlePortal" id="titlePortal" value={form.titlePortal} onChange={() => this.handleChange(event)} placeholder="Titulo Portal Cautivo" />
                                                </FormGroup>
                                               {!form.static_form ?
                                               <div style={{display:"contents"}}>
                                                <FormGroup className="customMarginInputs col-lg-6">
                                                      <Label for="sizeLogoMobile">Tamaño Logo Movil <b style={{color:'#10c773'}}>(pixeles)</b></Label>
                                                      <Input type="number" autoComplete="off" name="sizeLogoMobile" id="sizeLogoMobile" value={form.sizeLogoMobile} onChange={() => this.handleChange(event)} placeholder="Tamaño Logo Movil" />
                                                   </FormGroup>
                                                   <FormGroup className="customMarginInputs col-lg-6">
                                                      <Label for="sizeLogoWeb">Tamaño Logo Web <b style={{color:'#10c773'}}>(pixeles)</b></Label>
                                                      <Input type="number" autoComplete="off" name="sizeLogoWeb" id="sizeLogoWeb" value={form.sizeLogoWeb} onChange={() => this.handleChange(event)} placeholder="Tamaño Logo Web" />
                                                   </FormGroup>
                                               </div>
                                               :
                                                <div></div>
                                               }
                                                
                                             </div>
                                             
                                       </RctCardContent>
                                    </TabContainer>
                                 </div>
                                 <div className="card mb-0 transaction-box">
                                    <TabContainer dir={theme.direction}>
                                       <RctCardContent>
                                          <div className="row" style={{backgroundColor: "#404e77",padding: "30px 30px 66px 30px",marginRight: "1px"}}>
                                             <div className="col-lg-12">
                                                <p className="customTitles">Finalice Con Los Últimos Detalles</p>
                                             </div>
                                             <div className="row">
                                               
                                                <FormGroup className="col-lg-6">
                                                   <Label for="fileBackground">Imagen de Fondo</Label>
                                                   <Input accept="image/*" type="file" autoComplete="off" name="fileBackground" id="fileBackground" onChange={(e) => this.handleChange(e)} />
                                                   <FormText color="white">
                                                      Recuerde que el tamaño máximo es de 500kb y
                                                      1920 x 1280.
                                                   </FormText>
                                                </FormGroup>
                                                <FormGroup className="col-lg-6">
                                                   <Label for="fileLogo">Logo</Label>
                                                   <Input accept="image/*" type="file" autoComplete="off" name="fileLogo" id="fileLogo" onChange={(e) => this.handleChange(e)} />
                                                   <FormText color="white">
                                                      Recuerde que el tamaño máximo es de 50kb.
                                                   </FormText>
                                                </FormGroup>
                                               
                                             </div>
                                             <div className="col-lg-12" style={{textAlign:"center"}}>
                                                <div>
                                                   <FormControlLabel
                                                      control={<Checkbox checked={form.weather_widget} onChange={this.handleChangeCheckBox('weather_widget')} value="weather_widget" />}
                                                      label="Widget de Clima"
                                                   />
                                                </div>
                                             </div>
                                             <div className="col-lg-12" style={{textAlign:"center"}}>
                                                
                                                <div>
                                                   <FormControlLabel
                                                      control={<Checkbox checked={form.imgsBannerSwitch} onChange={this.handleChangeCheckBox('imgsBannerSwitch')} value="imgsBannerSwitch" />}
                                                      label="Permitir Banner"
                                                   />
                                                </div>
                                             </div>
                                                {form.imgsBannerSwitch?
                                                // <FormGroup>
                                                <div>
                                                   <div className="col-lg-12" >
                                                      <p style={{textAlign: "center",padding: "0 26px",fontSize: "small"}}>
                                                         Recuerde que al habilitar la opción patrocinios, la resolución ideal de las imagenes debe ser de <span style={{color:"#07fd07"}}>450 x 450 pixeles</span>
                                                      </p>
                                                      
                                                   </div>
                                                   <div className="col-lg-6" style={{ display: "flex", margin: "0 auto", paddingBottom: "20px"}}>
                                                      <FormControlLabelUI
                                                         control={<Checkbox checked={form.type_banner_one} onChange={this.handleChangeCheckBox('type_banner_one')} value="type_banner_one" />}
                                                         label={<p style={{fontSize: "12px", margin: "0"}}>Banner Imagenes</p>}
                                                      />
                                                      <FormControlLabelUI
                                                         control={<Checkbox checked={form.type_banner_two} onChange={this.handleChangeCheckBox('type_banner_two')} value="type_banner_two" />}
                                                         label={<p style={{fontSize: "12px", margin: "0"}}>Banner Patrocinios</p>}
                                                      />
                                                   </div>
                                                   <div className="col-lg-12" style={{padding: "0 25%"}}>
                                                      <div className="dropzone-wrapper" style={{paddingBottom:"20px"}}>
                                                            <DropzoneComponent
                                                               config={componentConfig}
                                                               eventHandlers={eventHandlers}
                                                               djsConfig={djsConfig}
                                                            > 
                                                            <div className="dz-message" style={{padding:"0 10px"}}>Suelte o Haga Click Para Subir Sus Imagenes</div>
                                                            
                                                            </ DropzoneComponent>
                                                      </div>
                                                </div>
                                               </div>
                                                :
                                                null
                                                }
                                             <div className="col-lg-12" style={{paddingBottom:"35px",paddingTop:"10px"}}>
                                                {form.id_campaing && form.id_campaing != 0 ?
                                                <Button onClick={() => this.handleSubmitEdit(event)} color="primary" style={{ margin:"0 auto", padding:"10px 100px" }}>Editar</Button>
                                                   :
                                                <Button onClick={() => this.handleSubmit(event)} color="primary" style={{ margin:"0 auto", padding:"10px 100px" }}>Guardar</Button>
                                                }
                                             </div>
                                          </div>
                                       </RctCardContent>
                                    </TabContainer>
                                 </div>
                              </SwipeableViews>
                           </div>
                        </CardContent>
                     </div>
                     {/*------------------------ previsualización pc-----------------------------*/}
                     <div className="col-lg-6">
                         <CardContent> 
                        
                              <div className="col-sm-12 my-auto" >
                              { form.fileBackground && form.type_form_one ?  
                                 <div className="Tab-wrap" style={{ padding:"1px"}}>
                                    <AppBar position="static" >
                                       <Tabs
                                          value={this.state.valueViewsFormat}
                                          onChange={this.handleChangeTabsViewsFormat}
                                          indicatorColor="primary"
                                          textColor="primary"
                                          variant="standard"
                                       >
                                          <Tab label={'Web'} />
                                          <Tab label={'Móvil'} />
                                       </Tabs>
                                    </AppBar>
                                    <SwipeableViews
                                       axis={themeLang.direction === 'rtl' ? 'x-reverse' : 'x'}
                                       index={this.state.valueViewsFormat}
                                       onChangeIndex={this.handleChangeTabsIndexViewsFormat}
                                    >
                                    <div className="card mb-0 transaction-box" style={{padding: "26px 5px 10px 5px", backgroundColor:"#404e77",marginRight: "1px"}}>
                                       <TabContainer dir={themeLang.direction}>
                                          <RctCardContent>
                                          <div className="cardCont" style={{background: "white", backgroundImage: `url(${form.fileBackground})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                                             <div className="logo">                        
                                                <img className="img-logo" src={form.fileLogo ? form.fileLogo:''} style={{width: `${form.sizeLogoWeb}px`}} alt="" />
                                                
                                             </div>
                                          <form className="formulario"  action="" style={{background: `rgba(${form.backgroundColorForm.r }, ${form.backgroundColorForm.g }, ${form.backgroundColorForm.b }, ${form.backgroundColorForm.a })`}}>
                                          <div className="titleForm" style={{color:`rgba(${form.colorTitleForm.r }, ${form.colorTitleForm.g }, ${form.colorTitleForm.b }, ${form.colorTitleForm.a })`}}>{form.titlePortal}</div>
                                             <div className="form-row">
                                             { form.nombre ?
                                                <div className="form-group col-md-6 colorPlaceHolder" name="form_group_nombre" id="form_group_nombre">
                                                   <input className="" type="text" autoComplete="off" className="form-control form-control-sm" id="nombre" name="nombre" placeholder="Nombre" />
                                                </div>
                                                :
                                                <div></div>
                                             }
                                             { form.apellidos ?
                                                <div className="form-group col-md-6 colorPlaceHolder" name="form_group_apellidos" id="form_group_apellidos">
                                                   <input className="" type="text" autoComplete="off"  className="form-control form-control-sm" id="apellidos" name="apellidos" placeholder="Apellidos"/>
                                                </div>
                                             :
                                             <div></div>
                                             }
                                             </div>
                                                { form.email ? 
                                                <div className="form-group colorPlaceHolder" id="form_group_email"  name="form_group_email">
                                                   <input className="colorPlaceHolder" type="email" autoComplete="off" className="form-control form-control-sm" id="email" name="email" placeholder="Correo Electrónico" />
                                                </div>
                                                :
                                                <div></div>
                                                }
                                                { form.telefono ?
                                                <div className="form-group colorPlaceHolder" id="form_group_telefono"  name="form_group_telefono">
                                                   <input className="colorPlaceHolder" type="tel" autoComplete="off" className="form-control form-control-sm" id="telefono" name="telefono" placeholder="Telefono" />
                                                </div>
                                                :
                                                <div></div>
                                                }
                                                { form.edad ?
                                                <div className="form-group colorPlaceHolder" id="form_group_edad"  name="form_group_edad">
                                                   <input className="colorPlaceHolder" type="text" autoComplete="off" className="form-control form-control-sm" id="edad" name="edad" placeholder="Edad" />
                                                </div>
                                                   :
                                                <div></div>
                                                }
                                                { form.genero ?
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
                                                { form.num_habitacion ?
                                                <div className="form-group colorPlaceHolder" id="form_group_habitacion"  name="form_group_habitacion">
                                                   <input type="text" autoComplete="off" className="form-control form-control-sm" id="num_habitacion" name="num_habitacion" placeholder="Ingrese el número de habitación" />
                                                </div>
                                                   :
                                                <div></div>
                                                }
                                                { form.num_voucher ?
                                                <div className="form-group colorPlaceHolder" id="form_group_voucher" name="form_group_voucher">
                                                   <input type="text"  autoComplete="off" className="form-control form-control-sm" id="num_voucher" name="num_voucher" placeholder="Ingrese el pin acceso a internet" />
                                                </div>
                                                   :
                                                <div></div>
                                                }
                                                { form.razon_visita ?
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
                                                                  color="primary"
                                                               />
                                                               
                                                            }
                                                            // label={<a href="#popup" style={{color:colorFontForm}}>Terminos y Condiciones</a>}
                                                            label={<a  style={{fontSize: "13px", color:`rgba(${form.colorFontForm.r }, ${form.colorFontForm.g }, ${form.colorFontForm.b }, ${form.colorFontForm.a })`}}>Aceptar Terminos y Condiciones</a>}
                                                         />
                                                      
                                                      </div>
                                                </div>

                                                <div className="form-btn">
                                                   <button type="button" id="submit" className="btn" style={{backgroundColor:`rgba(${form.buttonColors.r }, ${form.buttonColors.g }, ${form.buttonColors.b }, ${form.buttonColors.a })`, color:`rgba(${form.buttonColorsFont.r }, ${form.buttonColorsFont.g }, ${form.buttonColorsFont.b }, ${form.buttonColorsFont.a })`}}>Continuar</button>
                                                </div>     
                                          </form>
                                       </div>
                                          </RctCardContent>
                                       </TabContainer>
                                    </div>
                                    {/*----------------- previsualizacion móvil*/}
                                    <div className="card mb-0 transaction-box" style={{padding: "20px 90px 20px 90px", backgroundColor:"#404e77",marginRight: "1px"}}>
                                       <TabContainer dir={themeLang.direction}>
                                          <RctCardContent>
                                          <div className="cardCont" style={{background: "white", backgroundImage: `url(${form.fileBackground})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                                             <div className="logo">                        
                                                <img className="img-logo" src={form.fileLogo ? form.fileLogo:''} style={{width: `${form.sizeLogoMobile}px`}} alt="" />
                                             </div>
                                             <form className="formulario"  action="" style={{background: `rgba(${form.backgroundColorForm.r }, ${form.backgroundColorForm.g }, ${form.backgroundColorForm.b }, ${form.backgroundColorForm.a })`}}>
                                                <div className="titleForm" style={{color:`rgba(${form.colorTitleForm.r }, ${form.colorTitleForm.g }, ${form.colorTitleForm.b }, ${form.colorTitleForm.a })`}}>{form.titlePortal}</div>
                                                <div className="form-row">
                                                { form.nombre ?
                                                   <div className="form-group col-md-12 colorPlaceHolder" name="form_group_nombre" id="form_group_nombre">
                                                      <input className="" type="text" autoComplete="off" className="form-control form-control-sm" id="nombre" name="nombre" placeholder="Nombre" />
                                                   </div>
                                                   :
                                                   <div></div>
                                                }
                                                { form.apellidos ?
                                                   <div className="form-group col-md-12 colorPlaceHolder" name="form_group_apellidos" id="form_group_apellidos">
                                                      <input className="" type="text" autoComplete="off"  className="form-control form-control-sm" id="apellidos" name="apellidos" placeholder="Apellidos"/>
                                                   </div>
                                                :
                                                <div></div>
                                                }
                                                </div>
                                                   { form.email ? 
                                                   <div className="form-group colorPlaceHolder" id="form_group_email"  name="form_group_email">
                                                      <input className="colorPlaceHolder" type="email" autoComplete="off" className="form-control form-control-sm" id="email" name="email" placeholder="Correo Electrónico" />
                                                   </div>
                                                   :
                                                   <div></div>
                                                   }
                                                   { form.telefono ?
                                                   <div className="form-group colorPlaceHolder" id="form_group_telefono"  name="form_group_telefono">
                                                      <input className="colorPlaceHolder" type="tel" autoComplete="off" className="form-control form-control-sm" id="telefono" name="telefono" placeholder="Telefono" />
                                                   </div>
                                                   :
                                                   <div></div>
                                                   }
                                                   { form.edad ?
                                                   <div className="form-group colorPlaceHolder" id="form_group_edad"  name="form_group_edad">
                                                      <input className="colorPlaceHolder" type="text" autoComplete="off" className="form-control form-control-sm" id="edad" name="edad" placeholder="Edad" />
                                                   </div>
                                                      :
                                                   <div></div>
                                                   }
                                                   { form.genero ?
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
                                                   { form.num_habitacion ?
                                                   <div className="form-group colorPlaceHolder" id="form_group_habitacion"  name="form_group_habitacion">
                                                      <input type="text" autoComplete="off" className="form-control form-control-sm" id="num_habitacion" name="num_habitacion" placeholder="Ingrese el número de habitación" />
                                                   </div>
                                                      :
                                                   <div></div>
                                                   }
                                                   { form.num_voucher ?
                                                   <div className="form-group colorPlaceHolder" id="form_group_voucher" name="form_group_voucher">
                                                      <input type="text"  autoComplete="off" className="form-control form-control-sm" id="num_voucher" name="num_voucher" placeholder="Ingrese el pin acceso a internet" />
                                                   </div>
                                                      :
                                                   <div></div>
                                                   }
                                                   { form.razon_visita ?
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
                                                               label={<a  style={{fontSize: "13px",color:`rgba(${form.colorFontForm.r }, ${form.colorFontForm.g }, ${form.colorFontForm.b }, ${form.colorFontForm.a })`}}>Aceptar Terminos y Condiciones</a>}
                                                            />
                                                         
                                                         </div>
                                                   </div>

                                                   <div className="form-btn">
                                                      <button type="button" id="submit" className="btn" style={{backgroundColor:`rgba(${form.buttonColors.r }, ${form.buttonColors.g }, ${form.buttonColors.b }, ${form.buttonColors.a })`, color:`rgba(${form.buttonColorsFont.r }, ${form.buttonColorsFont.g }, ${form.buttonColorsFont.b }, ${form.buttonColorsFont.a })`}}>Continuar</button>
                                                   </div>     
                                             </form>
                                          </div>
                                          </RctCardContent>
                                       </TabContainer>
                                    </div>
                                    </SwipeableViews>
                                 </div>
                              : form.fileBackground && form.type_form_two ?
                              <div className="Tab-wrap" style={{ padding:"1px"}}>
                                 {/* --------formulario 2 --------- previsualización pc*/}
                                    <AppBar position="static" >
                                       <Tabs
                                          value={this.state.valueViewsFormat}
                                          onChange={this.handleChangeTabsViewsFormat}
                                          indicatorColor="primary"
                                          textColor="primary"
                                          variant="standard"
                                       >
                                          <Tab label={'Web'} />
                                          <Tab label={'Móvil'} />
                                       </Tabs>
                                    </AppBar>
                                    <SwipeableViews
                                       axis={themeLang.direction === 'rtl' ? 'x-reverse' : 'x'}
                                       index={this.state.valueViewsFormat}
                                       onChangeIndex={this.handleChangeTabsIndexViewsFormat}
                                    >
                                    <div className="card mb-0 transaction-box" style={{padding: "26px 5px 10px 5px", backgroundColor:"#404e77",marginRight: "1px"}}>
                                       <TabContainer dir={themeLang.direction}>
                                          <RctCardContent >
                                             <div className="rct-block-content blockContent2" style={{background: `url(${form.fileBackground})`,backgroundPosition: 'center!important', backgroundSize: 'cover!important', backgroundRepeat: 'no-repeat!important' }}>
                                             {form.static_form ?
                                             <div className="cardCont2" style={{background: 'rgba(68, 196, 231, 0.54)'}}>
                                                <div className="logo">                        
                                                   <img className="img-logo" src={form.fileLogo ? form.fileLogo:''} style={{width: '280px'}} alt="" />
                                                   
                                                </div>
                                                   <form className="formulario2"  action="" style={{background: '#fff'}}>
                                                      <div className="titleForm2" style={{color:'#44c4e7'}}>{form.titlePortal}</div>
                                                      <div className="form-row">
                                                      { form.nombre ?
                                                         <div className="form-group col-md-12 colorPlaceHolder2" name="form_group_nombre" id="form_group_nombre">
                                                            <input className="" type="text" autoComplete="off" className="form-control form-control-sm" id="nombre" name="nombre" placeholder="Nombre" />
                                                         </div>
                                                         :
                                                         <div></div>
                                                      }
                                                      { form.apellidos ?
                                                         <div className="form-group col-md-12 colorPlaceHolder2" name="form_group_apellidos" id="form_group_apellidos">
                                                            <input className="" type="text" autoComplete="off"  className="form-control form-control-sm" id="apellidos" name="apellidos" placeholder="Apellidos"/>
                                                         </div>
                                                      :
                                                      <div></div>
                                                      }
                                                      </div>
                                                      { form.email ? 
                                                      <div className="form-group colorPlaceHolder2" id="form_group_email"  name="form_group_email">
                                                         <input className="colorPlaceHolder" type="email" autoComplete="off" className="form-control form-control-sm" id="email" name="email" placeholder="Correo Electrónico" />
                                                      </div>
                                                      :
                                                      <div></div>
                                                      }
                                                      { form.telefono ?
                                                      <div className="form-group colorPlaceHolder2" id="form_group_telefono"  name="form_group_telefono">
                                                         <input className="colorPlaceHolder" type="tel" autoComplete="off" className="form-control form-control-sm" id="telefono" name="telefono" placeholder="Telefono" />
                                                      </div>
                                                      :
                                                      <div></div>
                                                      }
                                                      { form.edad ?
                                                      <div className="form-group colorPlaceHolder2" id="form_group_edad"  name="form_group_edad">
                                                         <input className="colorPlaceHolder" type="text" autoComplete="off" className="form-control form-control-sm" id="edad" name="edad" placeholder="Edad" />
                                                      </div>
                                                         :
                                                      <div></div>
                                                      }
                                                      { form.genero ?
                                                      <div className="form-group colorPlaceHolder2" id="form_group_genero"  name="form_group_genero">
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
                                                      { form.num_habitacion ?
                                                      <div className="form-group colorPlaceHolder2" id="form_group_habitacion"  name="form_group_habitacion">
                                                         <input type="text" autoComplete="off" className="form-control form-control-sm" id="num_habitacion" name="num_habitacion" placeholder="Ingrese el número de habitación" />
                                                      </div>
                                                         :
                                                      <div></div>
                                                      }
                                                      { form.num_voucher ?
                                                      <div className="form-group colorPlaceHolder2" id="form_group_voucher" name="form_group_voucher">
                                                         <input type="text"  autoComplete="off" className="form-control form-control-sm" id="num_voucher" name="num_voucher" placeholder="Ingrese el pin acceso a internet" />
                                                      </div>
                                                         :
                                                      <div></div>
                                                      }
                                                      { form.razon_visita ?
                                                      <div className="form-group colorPlaceHolder2" id="form_group_razon_visita"  name="form_group_razon_visita">
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
                                                      <div className="form-group check-terminos colorPlaceHolder2" id="form_group_check" name="form_group_check">
                                                            <div className="custom-control custom-switch">
                                                               <input type="checkbox" className="custom-control-input" id="customSwitches" name="customSwitches" />
                                                               

                                                               <FormControlLabel
                                                                  control={
                                                                     <IOSSwitch
                                                                        checked={this.state.checkedB}
                                                                        onChange={this.handleSwitch('checkedB')}
                                                                        value="checkedB"
                                                                        color="primary"
                                                                     />
                                                                     
                                                                  }
                                                                  // label={<a href="#popup" style={{color:colorFontForm}}>Terminos y Condiciones</a>}
                                                                  label={<a  style={{fontSize: "10px",color:'#000'}}>Aceptar Terminos y Condiciones</a>}
                                                               />
                                                            
                                                            </div>
                                                      </div>

                                                      <div className="form-btn">
                                                         <button type="button" id="submit" className="btn" style={{backgroundColor:'#44c4e7', color:"#fff"}}>Continuar</button>
                                                      </div>     
                                                   </form>
                                                </div>
                                                :
                                                <div className="cardCont2" style={{background: `rgba(${form.backgroundColor.r }, ${form.backgroundColor.g }, ${form.backgroundColor.b }, ${form.backgroundColor.a })`}}>
                                                   <div className="logo">                        
                                                      <img className="img-logo" src={form.fileLogo ? form.fileLogo:''} style={{width: `${form.sizeLogoWeb}px`}} alt="" />
                                                      
                                                   </div>
                                                   <form className="formulario2"  action="" style={{background: `rgba(${form.backgroundColorForm.r }, ${form.backgroundColorForm.g }, ${form.backgroundColorForm.b }, ${form.backgroundColorForm.a })`}}>
                                                      <div className="titleForm2" style={{color:`rgba(${form.colorTitleForm.r }, ${form.colorTitleForm.g }, ${form.colorTitleForm.b }, ${form.colorTitleForm.a })`}}>{form.titlePortal}</div>
                                                      <div className="form-row">
                                                      { form.nombre ?
                                                         <div className="form-group col-md-12 colorPlaceHolder2" name="form_group_nombre" id="form_group_nombre">
                                                            <input className="" type="text" autoComplete="off" className="form-control form-control-sm" id="nombre" name="nombre" placeholder="Nombre" />
                                                         </div>
                                                         :
                                                         <div></div>
                                                      }
                                                      { form.apellidos ?
                                                         <div className="form-group col-md-12 colorPlaceHolder2" name="form_group_apellidos" id="form_group_apellidos">
                                                            <input className="" type="text" autoComplete="off"  className="form-control form-control-sm" id="apellidos" name="apellidos" placeholder="Apellidos"/>
                                                         </div>
                                                      :
                                                      <div></div>
                                                      }
                                                   </div>
                                                      { form.email ? 
                                                      <div className="form-group colorPlaceHolder2" id="form_group_email"  name="form_group_email">
                                                         <input className="colorPlaceHolder" type="email" autoComplete="off" className="form-control form-control-sm" id="email" name="email" placeholder="Correo Electrónico" />
                                                      </div>
                                                      :
                                                      <div></div>
                                                      }
                                                      { form.telefono ?
                                                      <div className="form-group colorPlaceHolder2" id="form_group_telefono"  name="form_group_telefono">
                                                         <input className="colorPlaceHolder" type="tel" autoComplete="off" className="form-control form-control-sm" id="telefono" name="telefono" placeholder="Telefono" />
                                                      </div>
                                                      :
                                                      <div></div>
                                                      }
                                                      { form.edad ?
                                                      <div className="form-group colorPlaceHolder2" id="form_group_edad"  name="form_group_edad">
                                                         <input className="colorPlaceHolder" type="text" autoComplete="off" className="form-control form-control-sm" id="edad" name="edad" placeholder="Edad" />
                                                      </div>
                                                         :
                                                      <div></div>
                                                      }
                                                      { form.genero ?
                                                      <div className="form-group colorPlaceHolder2" id="form_group_genero"  name="form_group_genero">
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
                                                      { form.num_habitacion ?
                                                      <div className="form-group colorPlaceHolder2" id="form_group_habitacion"  name="form_group_habitacion">
                                                         <input type="text" autoComplete="off" className="form-control form-control-sm" id="num_habitacion" name="num_habitacion" placeholder="Ingrese el número de habitación" />
                                                      </div>
                                                         :
                                                      <div></div>
                                                      }
                                                      { form.num_voucher ?
                                                      <div className="form-group colorPlaceHolder2" id="form_group_voucher" name="form_group_voucher">
                                                         <input type="text"  autoComplete="off" className="form-control form-control-sm" id="num_voucher" name="num_voucher" placeholder="Ingrese el pin acceso a internet" />
                                                      </div>
                                                         :
                                                      <div></div>
                                                      }
                                                      { form.razon_visita ?
                                                      <div className="form-group colorPlaceHolder2" id="form_group_razon_visita"  name="form_group_razon_visita">
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
                                                      <div className="form-group check-terminos colorPlaceHolder2" id="form_group_check" name="form_group_check">
                                                            <div className="custom-control custom-switch">
                                                               <input type="checkbox" className="custom-control-input" id="customSwitches" name="customSwitches" />
                                                               

                                                               <FormControlLabel
                                                                  control={
                                                                     <IOSSwitch
                                                                        checked={this.state.checkedB}
                                                                        onChange={this.handleSwitch('checkedB')}
                                                                        value="checkedB"
                                                                        color="primary"
                                                                     />
                                                                     
                                                                  }
                                                                  // label={<a href="#popup" style={{color:colorFontForm}}>Terminos y Condiciones</a>}
                                                                  label={<a  style={{fontSize: "10px",color:`rgba(${form.colorFontForm.r }, ${form.colorFontForm.g }, ${form.colorFontForm.b }, ${form.colorFontForm.a })`}}>Aceptar Terminos y Condiciones</a>}
                                                               />
                                                            
                                                            </div>
                                                      </div>

                                                      <div className="form-btn">
                                                         <button type="button" id="submit" className="btn" style={{backgroundColor:`rgba(${form.buttonColors.r }, ${form.buttonColors.g }, ${form.buttonColors.b }, ${form.buttonColors.a })`, color:`rgba(${form.buttonColorsFont.r }, ${form.buttonColorsFont.g }, ${form.buttonColorsFont.b }, ${form.buttonColorsFont.a })`}}>Continuar</button>
                                                      </div>     
                                                   </form>
                                                </div>
                                             }
                                             </div>
                                          </RctCardContent>
                                       </TabContainer>
                                    </div>
                                    {/*----------------- previsualizacion móvil*/}
                                    <div className="card mb-0 transaction-box" style={{padding: "20px 90px 20px 90px", backgroundColor:"#404e77",marginRight: "1px"}}>
                                       <TabContainer dir={themeLang.direction}>
                                          <RctCardContent>
                                          <div className="rct-block-content blockContent2" style={{background: `url(${form.fileBackground})`,backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                                          {form.static_form ?
                                             <div className="cardCont2" style={{background: 'rgba(68, 196, 231, 0.54)'}}>
                                                <div className="logo">                        
                                                   <img className="img-logo" src={form.fileLogo ? form.fileLogo:''} style={{width: '250px'}} alt="" />
                                                   
                                                </div>
                                                   <form className="formulario2B"  action="" style={{background: '#fff'}}>
                                                      <div className="titleForm2" style={{color:'#44c4e7'}}>{form.titlePortal}</div>
                                                      <div className="form-row">
                                                      { form.nombre ?
                                                         <div className="form-group col-md-12 colorPlaceHolder2" name="form_group_nombre" id="form_group_nombre">
                                                            <input className="" type="text" autoComplete="off" className="form-control form-control-sm" id="nombre" name="nombre" placeholder="Nombre" />
                                                         </div>
                                                         :
                                                         <div></div>
                                                      }
                                                      { form.apellidos ?
                                                         <div className="form-group col-md-12 colorPlaceHolder2" name="form_group_apellidos" id="form_group_apellidos">
                                                            <input className="" type="text" autoComplete="off"  className="form-control form-control-sm" id="apellidos" name="apellidos" placeholder="Apellidos"/>
                                                         </div>
                                                      :
                                                      <div></div>
                                                      }
                                                      </div>
                                                      { form.email ? 
                                                      <div className="form-group colorPlaceHolder2" id="form_group_email"  name="form_group_email">
                                                         <input className="colorPlaceHolder" type="email" autoComplete="off" className="form-control form-control-sm" id="email" name="email" placeholder="Correo Electrónico" />
                                                      </div>
                                                      :
                                                      <div></div>
                                                      }
                                                      { form.telefono ?
                                                      <div className="form-group colorPlaceHolder2" id="form_group_telefono"  name="form_group_telefono">
                                                         <input className="colorPlaceHolder" type="tel" autoComplete="off" className="form-control form-control-sm" id="telefono" name="telefono" placeholder="Telefono" />
                                                      </div>
                                                      :
                                                      <div></div>
                                                      }
                                                      { form.edad ?
                                                      <div className="form-group colorPlaceHolder2" id="form_group_edad"  name="form_group_edad">
                                                         <input className="colorPlaceHolder" type="text" autoComplete="off" className="form-control form-control-sm" id="edad" name="edad" placeholder="Edad" />
                                                      </div>
                                                         :
                                                      <div></div>
                                                      }
                                                      { form.genero ?
                                                      <div className="form-group colorPlaceHolder2" id="form_group_genero"  name="form_group_genero">
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
                                                      { form.num_habitacion ?
                                                      <div className="form-group colorPlaceHolder2" id="form_group_habitacion"  name="form_group_habitacion">
                                                         <input type="text" autoComplete="off" className="form-control form-control-sm" id="num_habitacion" name="num_habitacion" placeholder="Ingrese el número de habitación" />
                                                      </div>
                                                         :
                                                      <div></div>
                                                      }
                                                      { form.num_voucher ?
                                                      <div className="form-group colorPlaceHolder2" id="form_group_voucher" name="form_group_voucher">
                                                         <input type="text"  autoComplete="off" className="form-control form-control-sm" id="num_voucher" name="num_voucher" placeholder="Ingrese el pin acceso a internet" />
                                                      </div>
                                                         :
                                                      <div></div>
                                                      }
                                                      { form.razon_visita ?
                                                      <div className="form-group colorPlaceHolder2" id="form_group_razon_visita"  name="form_group_razon_visita">
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
                                                      <div className="form-group check-terminos colorPlaceHolder2" id="form_group_check" name="form_group_check">
                                                            <div className="custom-control custom-switch">
                                                               <input type="checkbox" className="custom-control-input" id="customSwitches" name="customSwitches" />
                                                               

                                                               <FormControlLabel
                                                                  control={
                                                                     <IOSSwitch
                                                                        checked={this.state.checkedB}
                                                                        onChange={this.handleSwitch('checkedB')}
                                                                        value="checkedB"
                                                                        color="primary"
                                                                     />
                                                                     
                                                                  }
                                                                  // label={<a href="#popup" style={{color:colorFontForm}}>Terminos y Condiciones</a>}
                                                                  label={<a  style={{fontSize: "10px",color:'#000'}}>Aceptar Terminos y Condiciones</a>}
                                                               />
                                                            
                                                            </div>
                                                      </div>

                                                      <div className="form-btn">
                                                         <button type="button" id="submit" className="btn" style={{backgroundColor:'#44c4e7', color:"#fff"}}>Continuar</button>
                                                      </div>     
                                                   </form>
                                                </div>
                                                :
                                                <div className="cardCont2" style={{background: `rgba(${form.backgroundColor.r }, ${form.backgroundColor.g }, ${form.backgroundColor.b }, ${form.backgroundColor.a })`}}>
                                                   <div className="logo">                        
                                                      <img className="img-logo" src={form.fileLogo ? form.fileLogo:''} style={{width: `${form.sizeLogoWeb}px`}} alt="" />
                                                      
                                                   </div>
                                                   <form className="formulario2B"  action="" style={{background: `rgba(${form.backgroundColorForm.r }, ${form.backgroundColorForm.g }, ${form.backgroundColorForm.b }, ${form.backgroundColorForm.a })`}}>
                                                      <div className="titleForm2" style={{color:`rgba(${form.colorTitleForm.r }, ${form.colorTitleForm.g }, ${form.colorTitleForm.b }, ${form.colorTitleForm.a })`}}>{form.titlePortal}</div>
                                                      <div className="form-row">
                                                      { form.nombre ?
                                                         <div className="form-group col-md-12 colorPlaceHolder2" name="form_group_nombre" id="form_group_nombre">
                                                            <input className="" type="text" autoComplete="off" className="form-control form-control-sm" id="nombre" name="nombre" placeholder="Nombre" />
                                                         </div>
                                                         :
                                                         <div></div>
                                                      }
                                                      { form.apellidos ?
                                                         <div className="form-group col-md-12 colorPlaceHolder2" name="form_group_apellidos" id="form_group_apellidos">
                                                            <input className="" type="text" autoComplete="off"  className="form-control form-control-sm" id="apellidos" name="apellidos" placeholder="Apellidos"/>
                                                         </div>
                                                      :
                                                      <div></div>
                                                      }
                                                   </div>
                                                      { form.email ? 
                                                      <div className="form-group colorPlaceHolder2" id="form_group_email"  name="form_group_email">
                                                         <input className="colorPlaceHolder" type="email" autoComplete="off" className="form-control form-control-sm" id="email" name="email" placeholder="Correo Electrónico" />
                                                      </div>
                                                      :
                                                      <div></div>
                                                      }
                                                      { form.telefono ?
                                                      <div className="form-group colorPlaceHolder2" id="form_group_telefono"  name="form_group_telefono">
                                                         <input className="colorPlaceHolder" type="tel" autoComplete="off" className="form-control form-control-sm" id="telefono" name="telefono" placeholder="Telefono" />
                                                      </div>
                                                      :
                                                      <div></div>
                                                      }
                                                      { form.edad ?
                                                      <div className="form-group colorPlaceHolder2" id="form_group_edad"  name="form_group_edad">
                                                         <input className="colorPlaceHolder" type="text" autoComplete="off" className="form-control form-control-sm" id="edad" name="edad" placeholder="Edad" />
                                                      </div>
                                                         :
                                                      <div></div>
                                                      }
                                                      { form.genero ?
                                                      <div className="form-group colorPlaceHolder2" id="form_group_genero"  name="form_group_genero">
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
                                                      { form.num_habitacion ?
                                                      <div className="form-group colorPlaceHolder2" id="form_group_habitacion"  name="form_group_habitacion">
                                                         <input type="text" autoComplete="off" className="form-control form-control-sm" id="num_habitacion" name="num_habitacion" placeholder="Ingrese el número de habitación" />
                                                      </div>
                                                         :
                                                      <div></div>
                                                      }
                                                      { form.num_voucher ?
                                                      <div className="form-group colorPlaceHolder2" id="form_group_voucher" name="form_group_voucher">
                                                         <input type="text"  autoComplete="off" className="form-control form-control-sm" id="num_voucher" name="num_voucher" placeholder="Ingrese el pin acceso a internet" />
                                                      </div>
                                                         :
                                                      <div></div>
                                                      }
                                                      { form.razon_visita ?
                                                      <div className="form-group colorPlaceHolder2" id="form_group_razon_visita"  name="form_group_razon_visita">
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
                                                      <div className="form-group check-terminos colorPlaceHolder2" id="form_group_check" name="form_group_check">
                                                            <div className="custom-control custom-switch">
                                                               <input type="checkbox" className="custom-control-input" id="customSwitches" name="customSwitches" />
                                                               

                                                               <FormControlLabel
                                                                  control={
                                                                     <IOSSwitch
                                                                        checked={this.state.checkedB}
                                                                        onChange={this.handleSwitch('checkedB')}
                                                                        value="checkedB"
                                                                        color="primary"
                                                                     />
                                                                     
                                                                  }
                                                                  // label={<a href="#popup" style={{color:colorFontForm}}>Terminos y Condiciones</a>}
                                                                  label={<a  style={{fontSize: "10px",color:`rgba(${form.colorFontForm.r }, ${form.colorFontForm.g }, ${form.colorFontForm.b }, ${form.colorFontForm.a })`}}>Aceptar Terminos y Condiciones</a>}
                                                               />
                                                            
                                                            </div>
                                                      </div>

                                                      <div className="form-btn">
                                                         <button type="button" id="submit" className="btn" style={{backgroundColor:`rgba(${form.buttonColors.r }, ${form.buttonColors.g }, ${form.buttonColors.b }, ${form.buttonColors.a })`, color:`rgba(${form.buttonColorsFont.r }, ${form.buttonColorsFont.g }, ${form.buttonColorsFont.b }, ${form.buttonColorsFont.a })`}}>Continuar</button>
                                                      </div>     
                                                   </form>
                                                </div>
                                             }
                                          </div>
                                          </RctCardContent>
                                       </TabContainer>
                                    </div>
                                    </SwipeableViews>
                                 </div>
                              : form.fileBackground && form.type_form_three ?
                              <div className="Tab-wrap" style={{ padding:"1px"}}>
                                 {/* --------formulario 3 --------- previsualización pc*/}
                                    <AppBar position="static" >
                                       <Tabs
                                          value={this.state.valueViewsFormat}
                                          onChange={this.handleChangeTabsViewsFormat}
                                          indicatorColor="primary"
                                          textColor="primary"
                                          variant="standard"
                                       >
                                          <Tab label={'Web'} />
                                          <Tab label={'Móvil'} />
                                       </Tabs>
                                    </AppBar>
                                    <SwipeableViews
                                       axis={themeLang.direction === 'rtl' ? 'x-reverse' : 'x'}
                                       index={this.state.valueViewsFormat}
                                       onChangeIndex={this.handleChangeTabsIndexViewsFormat}
                                    >
                                    <div className="card mb-0 transaction-box" style={{padding: "26px 5px 10px 5px", backgroundColor:"#404e77",marginRight: "1px"}}>
                                       <TabContainer dir={themeLang.direction}>
                                          <RctCardContent >
                                          <div className="rct-block-content blockContent3" style={{background: `url(${form.fileBackground})`}}>
                                          {form.static_form ? 
                                             <div className="cardCont3" style={{background: 'rgba(0, 0, 0, 0.75)'}}>
                                                <form className="formulario3"  action=""style={{background: '-webkit-gradient(linear, 0% 0%, 100% 100%, from(rgba(255, 255, 255, 0.5)), to(rgba(52, 78, 151,0.5)))'}}>
                                                   <div className="logo3">                        
                                                      <img className="img-logo" src={form.fileLogo ? form.fileLogo:''} style={{width: '350px'}} alt="" />
                                                   </div>
                                                   <div className="titleForm3" style={{color:'#000'}}>{form.titlePortal}</div>
                                                   <div className="form-row">
                                                   { form.nombre ?
                                                      <div className="form-group col-md-12 colorPlaceHolder3" name="form_group_nombre" id="form_group_nombre">
                                                         <input className="" type="text" autoComplete="off" className="form-control form-control-sm" id="nombre" name="nombre" placeholder="Nombre" />
                                                      </div>
                                                      :
                                                      <div></div>
                                                   }
                                                   { form.apellidos ?
                                                      <div className="form-group col-md-12 colorPlaceHolder3" name="form_group_apellidos" id="form_group_apellidos">
                                                         <input className="" type="text" autoComplete="off"  className="form-control form-control-sm" id="apellidos" name="apellidos" placeholder="Apellidos"/>
                                                      </div>
                                                   :
                                                   <div></div>
                                                   }
                                                   </div>
                                                   { form.email ? 
                                                   <div className="form-group colorPlaceHolder3" id="form_group_email"  name="form_group_email">
                                                      <input className="colorPlaceHolder" type="email" autoComplete="off" className="form-control form-control-sm" id="email" name="email" placeholder="Correo Electrónico" />
                                                   </div>
                                                   :
                                                   <div></div>
                                                   }
                                                   { form.telefono ?
                                                   <div className="form-group colorPlaceHolder3" id="form_group_telefono"  name="form_group_telefono">
                                                      <input className="colorPlaceHolder" type="tel" autoComplete="off" className="form-control form-control-sm" id="telefono" name="telefono" placeholder="Telefono" />
                                                   </div>
                                                   :
                                                   <div></div>
                                                   }
                                                   { form.edad ?
                                                   <div className="form-group colorPlaceHolder3" id="form_group_edad"  name="form_group_edad">
                                                      <input className="colorPlaceHolder" type="text" autoComplete="off" className="form-control form-control-sm" id="edad" name="edad" placeholder="Edad" />
                                                   </div>
                                                      :
                                                   <div></div>
                                                   }
                                                   { form.genero ?
                                                   <div className="form-group colorPlaceHolder3" id="form_group_genero"  name="form_group_genero">
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
                                                   { form.num_habitacion ?
                                                   <div className="form-group colorPlaceHolder3" id="form_group_habitacion"  name="form_group_habitacion">
                                                      <input type="text" autoComplete="off" className="form-control form-control-sm" id="num_habitacion" name="num_habitacion" placeholder="Ingrese el número de habitación" />
                                                   </div>
                                                      :
                                                   <div></div>
                                                   }
                                                   { form.num_voucher ?
                                                   <div className="form-group colorPlaceHolder3" id="form_group_voucher" name="form_group_voucher">
                                                      <input type="text"  autoComplete="off" className="form-control form-control-sm" id="num_voucher" name="num_voucher" placeholder="Ingrese el pin acceso a internet" />
                                                   </div>
                                                      :
                                                   <div></div>
                                                   }
                                                   { form.razon_visita ?
                                                   <div className="form-group colorPlaceHolder3" id="form_group_razon_visita"  name="form_group_razon_visita">
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
                                                   <div className="form-group check-terminos colorPlaceHolder3" id="form_group_check" name="form_group_check">
                                                         <div className="custom-control custom-switch">
                                                            <input type="checkbox" className="custom-control-input" id="" name="" />
                                                            

                                                            <FormControlLabel
                                                               control={
                                                                  <IOSSwitch
                                                                     checked={this.state.checkedB}
                                                                     onChange={this.handleSwitch('checkedB')}
                                                                     value="checkedB"
                                                                     color="primary"
                                                                  />
                                                                  
                                                               }
                                                               // label={<a href="#popup" style={{color:colorFontForm}}>Terminos y Condiciones</a>}
                                                               label={<a  style={{fontSize: "12px",color:'#fff'}}>Aceptar Terminos y Condiciones</a>}
                                                            />
                                                         
                                                         </div>
                                                   </div>

                                                   <div className="form-btn">
                                                      <button type="button" id="submit" className="btn btnStyle3" style={{backgroundColor:'#4c8ee8', color:"#fff"}}>Continuar</button>
                                                   </div>     
                                                </form>
                                             </div>      
                                          :
                                          <div className="cardCont3" style={{background: `rgba(${form.backgroundColor.r }, ${form.backgroundColor.g }, ${form.backgroundColor.b }, ${form.backgroundColor.a })`}}>
                                             <form className="formulario3"  action="" style={{background: `rgba(${form.backgroundColorForm.r }, ${form.backgroundColorForm.g }, ${form.backgroundColorForm.b }, ${form.backgroundColorForm.a })`}}>
                                                <div className="logo3">                        
                                                   <img className="img-logo" src={form.fileLogo ? form.fileLogo:''} style={{width: `${form.sizeLogoWeb}px`}} alt="" />
                                                </div>
                                                <div className="titleForm3" style={{color:`rgba(${form.colorTitleForm.r }, ${form.colorTitleForm.g }, ${form.colorTitleForm.b }, ${form.colorTitleForm.a })`}}>{form.titlePortal}</div>
                                                <div className="form-row">
                                                { form.nombre ?
                                                   <div className="form-group col-md-12 colorPlaceHolder3" name="form_group_nombre" id="form_group_nombre">
                                                      <input className="" type="text" autoComplete="off" className="form-control form-control-sm" id="nombre" name="nombre" placeholder="Nombre" />
                                                   </div>
                                                   :
                                                   <div></div>
                                                }
                                                { form.apellidos ?
                                                   <div className="form-group col-md-12 colorPlaceHolder3" name="form_group_apellidos" id="form_group_apellidos">
                                                      <input className="" type="text" autoComplete="off"  className="form-control form-control-sm" id="apellidos" name="apellidos" placeholder="Apellidos"/>
                                                   </div>
                                                :
                                                <div></div>
                                                }
                                                </div>
                                                { form.email ? 
                                                <div className="form-group colorPlaceHolder3" id="form_group_email"  name="form_group_email">
                                                   <input className="colorPlaceHolder" type="email" autoComplete="off" className="form-control form-control-sm" id="email" name="email" placeholder="Correo Electrónico" />
                                                </div>
                                                :
                                                <div></div>
                                                }
                                                { form.telefono ?
                                                <div className="form-group colorPlaceHolder3" id="form_group_telefono"  name="form_group_telefono">
                                                   <input className="colorPlaceHolder" type="tel" autoComplete="off" className="form-control form-control-sm" id="telefono" name="telefono" placeholder="Telefono" />
                                                </div>
                                                :
                                                <div></div>
                                                }
                                                { form.edad ?
                                                <div className="form-group colorPlaceHolder3" id="form_group_edad"  name="form_group_edad">
                                                   <input className="colorPlaceHolder" type="text" autoComplete="off" className="form-control form-control-sm" id="edad" name="edad" placeholder="Edad" />
                                                </div>
                                                   :
                                                <div></div>
                                                }
                                                { form.genero ?
                                                <div className="form-group colorPlaceHolder3" id="form_group_genero"  name="form_group_genero">
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
                                                { form.num_habitacion ?
                                                <div className="form-group colorPlaceHolder3" id="form_group_habitacion"  name="form_group_habitacion">
                                                   <input type="text" autoComplete="off" className="form-control form-control-sm" id="num_habitacion" name="num_habitacion" placeholder="Ingrese el número de habitación" />
                                                </div>
                                                   :
                                                <div></div>
                                                }
                                                { form.num_voucher ?
                                                <div className="form-group colorPlaceHolder3" id="form_group_voucher" name="form_group_voucher">
                                                   <input type="text"  autoComplete="off" className="form-control form-control-sm" id="num_voucher" name="num_voucher" placeholder="Ingrese el pin acceso a internet" />
                                                </div>
                                                   :
                                                <div></div>
                                                }
                                                { form.razon_visita ?
                                                <div className="form-group colorPlaceHolder3" id="form_group_razon_visita"  name="form_group_razon_visita">
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
                                                <div className="form-group check-terminos colorPlaceHolder3" id="form_group_check" name="form_group_check">
                                                      <div className="custom-control custom-switch">
                                                         <input type="checkbox" className="custom-control-input" id="" name="" />
                                                         

                                                         <FormControlLabel
                                                            control={
                                                               <IOSSwitch
                                                                  checked={this.state.checkedB}
                                                                  onChange={this.handleSwitch('checkedB')}
                                                                  value="checkedB"
                                                                  color="primary"
                                                               />
                                                               
                                                            }
                                                            // label={<a href="#popup" style={{color:colorFontForm}}>Terminos y Condiciones</a>}
                                                            label={<a  style={{fontSize: "12px",color:`rgba(${form.colorFontForm.r }, ${form.colorFontForm.g }, ${form.colorFontForm.b }, ${form.colorFontForm.a })`}}>Aceptar Terminos y Condiciones</a>}
                                                         />
                                                      
                                                      </div>
                                                </div>

                                                <div className="form-btn">
                                                   <button type="button" id="submit" className="btn btnStyle3" style={{backgroundColor:`rgba(${form.buttonColors.r }, ${form.buttonColors.g }, ${form.buttonColors.b }, ${form.buttonColors.a })`, color:`rgba(${form.buttonColorsFont.r }, ${form.buttonColorsFont.g }, ${form.buttonColorsFont.b }, ${form.buttonColorsFont.a })`}}>Continuar</button>
                                                </div>     
                                             </form>
                                          </div>
                                          }
                                            
                                             </div>
                                          </RctCardContent>
                                       </TabContainer>
                                    </div>
                                    {/*----------------- previsualizacion móvil*/}
                                    <div className="card mb-0 transaction-box" style={{padding: "20px 90px 20px 90px", backgroundColor:"#404e77",marginRight: "1px"}}>
                                       <TabContainer dir={themeLang.direction}>
                                          <RctCardContent>
                                             <div className="rct-block-content blockContent3" style={{background: `url(${form.fileBackground})`,backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                                             {form.static_form ? 
                                                <div className="cardCont3" style={{background: 'rgba(0, 0, 0, 0.75)'}}>
                                                   <form className="formulario3B"  action=""style={{background: '-webkit-gradient(linear, 0% 0%, 100% 100%, from(rgba(255, 255, 255, 0.5)), to(rgba(52, 78, 151,0.5)))'}}>
                                                      <div className="logo3">                        
                                                         <img className="img-logo" src={form.fileLogo ? form.fileLogo:''} style={{width: '250px'}} alt="" />
                                                      </div>
                                                      <div className="titleForm3B" style={{color:'#000'}}>{form.titlePortal}</div>
                                                      <div className="form-row">
                                                      { form.nombre ?
                                                         <div className="form-group col-md-12 colorPlaceHolder3" name="form_group_nombre" id="form_group_nombre">
                                                            <input className="" type="text" autoComplete="off" className="form-control form-control-sm" id="nombre" name="nombre" placeholder="Nombre" />
                                                         </div>
                                                         :
                                                         <div></div>
                                                      }
                                                      { form.apellidos ?
                                                         <div className="form-group col-md-12 colorPlaceHolder3" name="form_group_apellidos" id="form_group_apellidos">
                                                            <input className="" type="text" autoComplete="off"  className="form-control form-control-sm" id="apellidos" name="apellidos" placeholder="Apellidos"/>
                                                         </div>
                                                      :
                                                      <div></div>
                                                      }
                                                      </div>
                                                      { form.email ? 
                                                      <div className="form-group colorPlaceHolder3" id="form_group_email"  name="form_group_email">
                                                         <input className="colorPlaceHolder" type="email" autoComplete="off" className="form-control form-control-sm" id="email" name="email" placeholder="Correo Electrónico" />
                                                      </div>
                                                      :
                                                      <div></div>
                                                      }
                                                      { form.telefono ?
                                                      <div className="form-group colorPlaceHolder3" id="form_group_telefono"  name="form_group_telefono">
                                                         <input className="colorPlaceHolder" type="tel" autoComplete="off" className="form-control form-control-sm" id="telefono" name="telefono" placeholder="Telefono" />
                                                      </div>
                                                      :
                                                      <div></div>
                                                      }
                                                      { form.edad ?
                                                      <div className="form-group colorPlaceHolder3" id="form_group_edad"  name="form_group_edad">
                                                         <input className="colorPlaceHolder" type="text" autoComplete="off" className="form-control form-control-sm" id="edad" name="edad" placeholder="Edad" />
                                                      </div>
                                                         :
                                                      <div></div>
                                                      }
                                                      { form.genero ?
                                                      <div className="form-group colorPlaceHolder3" id="form_group_genero"  name="form_group_genero">
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
                                                      { form.num_habitacion ?
                                                      <div className="form-group colorPlaceHolder3" id="form_group_habitacion"  name="form_group_habitacion">
                                                         <input type="text" autoComplete="off" className="form-control form-control-sm" id="num_habitacion" name="num_habitacion" placeholder="Ingrese el número de habitación" />
                                                      </div>
                                                         :
                                                      <div></div>
                                                      }
                                                      { form.num_voucher ?
                                                      <div className="form-group colorPlaceHolder3" id="form_group_voucher" name="form_group_voucher">
                                                         <input type="text"  autoComplete="off" className="form-control form-control-sm" id="num_voucher" name="num_voucher" placeholder="Ingrese el pin acceso a internet" />
                                                      </div>
                                                         :
                                                      <div></div>
                                                      }
                                                      { form.razon_visita ?
                                                      <div className="form-group colorPlaceHolder3" id="form_group_razon_visita"  name="form_group_razon_visita">
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
                                                      <div className="form-group check-terminos colorPlaceHolder3" id="form_group_check" name="form_group_check">
                                                            <div className="custom-control custom-switch">
                                                               <input type="checkbox" className="custom-control-input" id="" name="" />
                                                               

                                                               <FormControlLabel
                                                                  control={
                                                                     <IOSSwitch
                                                                        checked={this.state.checkedB}
                                                                        onChange={this.handleSwitch('checkedB')}
                                                                        value="checkedB"
                                                                        color="primary"
                                                                     />
                                                                     
                                                                  }
                                                                  // label={<a href="#popup" style={{color:colorFontForm}}>Terminos y Condiciones</a>}
                                                                  label={<a  style={{fontSize: "10px",marginBottom:"4px",color:'#fff'}}>Aceptar Terminos y Condiciones</a>}
                                                               />
                                                            
                                                            </div>
                                                      </div>

                                                      <div className="form-btn">
                                                         <button type="button" id="submit" className="btn btnStyle3" style={{backgroundColor:'#4c8ee8', color:"#fff"}}>Continuar</button>
                                                      </div>     
                                                   </form>
                                                </div>      
                                             :
                                             <div className="cardCont3" style={{background: `rgba(${form.backgroundColor.r }, ${form.backgroundColor.g }, ${form.backgroundColor.b }, ${form.backgroundColor.a })`}}>
                                                <form className="formulario3B"  action="" style={{background: `rgba(${form.backgroundColorForm.r }, ${form.backgroundColorForm.g }, ${form.backgroundColorForm.b }, ${form.backgroundColorForm.a })`}}>
                                                   <div className="logo3">                        
                                                      <img className="img-logo" src={form.fileLogo ? form.fileLogo:''} style={{width: `${form.sizeLogoWeb}px`}} alt="" />
                                                   </div>
                                                   <div className="titleForm3B" style={{color:`rgba(${form.colorTitleForm.r }, ${form.colorTitleForm.g }, ${form.colorTitleForm.b }, ${form.colorTitleForm.a })`}}>{form.titlePortal}</div>
                                                   <div className="form-row">
                                                   { form.nombre ?
                                                      <div className="form-group col-md-12 colorPlaceHolder3" name="form_group_nombre" id="form_group_nombre">
                                                         <input className="" type="text" autoComplete="off" className="form-control form-control-sm" id="nombre" name="nombre" placeholder="Nombre" />
                                                      </div>
                                                      :
                                                      <div></div>
                                                   }
                                                   { form.apellidos ?
                                                      <div className="form-group col-md-12 colorPlaceHolder3" name="form_group_apellidos" id="form_group_apellidos">
                                                         <input className="" type="text" autoComplete="off"  className="form-control form-control-sm" id="apellidos" name="apellidos" placeholder="Apellidos"/>
                                                      </div>
                                                   :
                                                   <div></div>
                                                   }
                                                   </div>
                                                   { form.email ? 
                                                   <div className="form-group colorPlaceHolder3" id="form_group_email"  name="form_group_email">
                                                      <input className="colorPlaceHolder" type="email" autoComplete="off" className="form-control form-control-sm" id="email" name="email" placeholder="Correo Electrónico" />
                                                   </div>
                                                   :
                                                   <div></div>
                                                   }
                                                   { form.telefono ?
                                                   <div className="form-group colorPlaceHolder3" id="form_group_telefono"  name="form_group_telefono">
                                                      <input className="colorPlaceHolder" type="tel" autoComplete="off" className="form-control form-control-sm" id="telefono" name="telefono" placeholder="Telefono" />
                                                   </div>
                                                   :
                                                   <div></div>
                                                   }
                                                   { form.edad ?
                                                   <div className="form-group colorPlaceHolder3" id="form_group_edad"  name="form_group_edad">
                                                      <input className="colorPlaceHolder" type="text" autoComplete="off" className="form-control form-control-sm" id="edad" name="edad" placeholder="Edad" />
                                                   </div>
                                                      :
                                                   <div></div>
                                                   }
                                                   { form.genero ?
                                                   <div className="form-group colorPlaceHolder3" id="form_group_genero"  name="form_group_genero">
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
                                                   { form.num_habitacion ?
                                                   <div className="form-group colorPlaceHolder3" id="form_group_habitacion"  name="form_group_habitacion">
                                                      <input type="text" autoComplete="off" className="form-control form-control-sm" id="num_habitacion" name="num_habitacion" placeholder="Ingrese el número de habitación" />
                                                   </div>
                                                      :
                                                   <div></div>
                                                   }
                                                   { form.num_voucher ?
                                                   <div className="form-group colorPlaceHolder3" id="form_group_voucher" name="form_group_voucher">
                                                      <input type="text"  autoComplete="off" className="form-control form-control-sm" id="num_voucher" name="num_voucher" placeholder="Ingrese el pin acceso a internet" />
                                                   </div>
                                                      :
                                                   <div></div>
                                                   }
                                                   { form.razon_visita ?
                                                   <div className="form-group colorPlaceHolder3" id="form_group_razon_visita"  name="form_group_razon_visita">
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
                                                   <div className="form-group check-terminos colorPlaceHolder3" id="form_group_check" name="form_group_check">
                                                         <div className="custom-control custom-switch">
                                                            <input type="checkbox" className="custom-control-input" id="" name="" />
                                                            

                                                            <FormControlLabel
                                                               control={
                                                                  <IOSSwitch
                                                                     checked={this.state.checkedB}
                                                                     onChange={this.handleSwitch('checkedB')}
                                                                     value="checkedB"
                                                                     color="primary"
                                                                  />
                                                                  
                                                               }
                                                               // label={<a href="#popup" style={{color:colorFontForm}}>Terminos y Condiciones</a>}
                                                               label={<a  style={{fontSize: "10px",color:`rgba(${form.colorFontForm.r }, ${form.colorFontForm.g }, ${form.colorFontForm.b }, ${form.colorFontForm.a })`}}>Aceptar Terminos y Condiciones</a>}
                                                            />
                                                         
                                                         </div>
                                                   </div>

                                                   <div className="form-btn">
                                                      <button type="button" id="submit" className="btn btnStyle3" style={{backgroundColor:`rgba(${form.buttonColors.r }, ${form.buttonColors.g }, ${form.buttonColors.b }, ${form.buttonColors.a })`, color:`rgba(${form.buttonColorsFont.r }, ${form.buttonColorsFont.g }, ${form.buttonColorsFont.b }, ${form.buttonColorsFont.a })`}}>Continuar</button>
                                                   </div>     
                                                </form>
                                             </div>
                                             }
                                             </div>
                                          </RctCardContent>
                                       </TabContainer>
                                    </div>
                                    </SwipeableViews>
                                 </div>
                              :!form.fileBackground && form.type_form_one ?
                              <div className="Tab-wrap" style={{ padding:"1px"}}>
                                    <AppBar position="static" >
                                       <Tabs
                                          value={this.state.valueViewsFormat}
                                          onChange={this.handleChangeTabsViewsFormat}
                                          indicatorColor="primary"
                                          textColor="primary"
                                          variant="standard"
                                       >
                                          <Tab label={'Web'} />
                                          <Tab label={'Móvil'} />
                                       </Tabs>
                                    </AppBar>
                                    <SwipeableViews
                                       axis={themeLang.direction === 'rtl' ? 'x-reverse' : 'x'}
                                       index={this.state.valueViewsFormat}
                                       onChangeIndex={this.handleChangeTabsIndexViewsFormat}
                                    >
                                    <div className="card mb-0 transaction-box" style={{padding: "26px 5px 10px 5px", backgroundColor:"#404e77",marginRight: "1px"}}>
                                       <TabContainer dir={themeLang.direction}>
                                          <RctCardContent>
                                          <div className="cardCont" style={{background: "white", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                                             <div className="logo">                        
                                                <img className="img-logo" src={form.fileLogo ? form.fileLogo:''} style={{width: `${form.sizeLogoWeb}px`}} alt="" />
                                                
                                             </div>
                                          <form className="formulario"  action="" style={{background: `rgba(${form.backgroundColorForm.r }, ${form.backgroundColorForm.g }, ${form.backgroundColorForm.b }, ${form.backgroundColorForm.a })`}}>
                                          <div className="titleForm" style={{color:`rgba(${form.colorTitleForm.r }, ${form.colorTitleForm.g }, ${form.colorTitleForm.b }, ${form.colorTitleForm.a })`}}>{form.titlePortal}</div>
                                             <div className="form-row">
                                             { form.nombre ?
                                                <div className="form-group col-md-6 colorPlaceHolder" name="form_group_nombre" id="form_group_nombre">
                                                   <input className="" type="text" autoComplete="off" className="form-control form-control-sm" id="nombre" name="nombre" placeholder="Nombre" />
                                                </div>
                                                :
                                                <div></div>
                                             }
                                             { form.apellidos ?
                                                <div className="form-group col-md-6 colorPlaceHolder" name="form_group_apellidos" id="form_group_apellidos">
                                                   <input className="" type="text" autoComplete="off"  className="form-control form-control-sm" id="apellidos" name="apellidos" placeholder="Apellidos"/>
                                                </div>
                                             :
                                             <div></div>
                                             }
                                             </div>
                                                { form.email ? 
                                                <div className="form-group colorPlaceHolder" id="form_group_email"  name="form_group_email">
                                                   <input className="colorPlaceHolder" type="email" autoComplete="off" className="form-control form-control-sm" id="email" name="email" placeholder="Correo Electrónico" />
                                                </div>
                                                :
                                                <div></div>
                                                }
                                                { form.telefono ?
                                                <div className="form-group colorPlaceHolder" id="form_group_telefono"  name="form_group_telefono">
                                                   <input className="colorPlaceHolder" type="tel" autoComplete="off" className="form-control form-control-sm" id="telefono" name="telefono" placeholder="Telefono" />
                                                </div>
                                                :
                                                <div></div>
                                                }
                                                { form.edad ?
                                                <div className="form-group colorPlaceHolder" id="form_group_edad"  name="form_group_edad">
                                                   <input className="colorPlaceHolder" type="text" autoComplete="off" className="form-control form-control-sm" id="edad" name="edad" placeholder="Edad" />
                                                </div>
                                                   :
                                                <div></div>
                                                }
                                                { form.genero ?
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
                                                { form.num_habitacion ?
                                                <div className="form-group colorPlaceHolder" id="form_group_habitacion"  name="form_group_habitacion">
                                                   <input type="text" autoComplete="off" className="form-control form-control-sm" id="num_habitacion" name="num_habitacion" placeholder="Ingrese el número de habitación" />
                                                </div>
                                                   :
                                                <div></div>
                                                }
                                                { form.num_voucher ?
                                                <div className="form-group colorPlaceHolder" id="form_group_voucher" name="form_group_voucher">
                                                   <input type="text"  autoComplete="off" className="form-control form-control-sm" id="num_voucher" name="num_voucher" placeholder="Ingrese el pin acceso a internet" />
                                                </div>
                                                   :
                                                <div></div>
                                                }
                                                { form.razon_visita ?
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
                                                                  color="primary"
                                                               />
                                                               
                                                            }
                                                            // label={<a href="#popup" style={{color:colorFontForm}}>Terminos y Condiciones</a>}
                                                            label={<a  style={{fontSize: "13px", color:`rgba(${form.colorFontForm.r }, ${form.colorFontForm.g }, ${form.colorFontForm.b }, ${form.colorFontForm.a })`}}>Aceptar Terminos y Condiciones</a>}
                                                         />
                                                      
                                                      </div>
                                                </div>

                                                <div className="form-btn">
                                                   <button type="button" id="submit" className="btn" style={{background:`rgba(${form.buttonColors.r }, ${form.buttonColors.g }, ${form.buttonColors.b }, ${form.buttonColors.a })`, color:`rgba(${form.buttonColorsFont.r }, ${form.buttonColorsFont.g }, ${form.buttonColorsFont.b }, ${form.buttonColorsFont.a })`}}>Continuar</button>
                                                </div>     
                                          </form>
                                       </div>
                                          </RctCardContent>
                                       </TabContainer>
                                    </div>
                                    {/*----------------- previsualizacion móvil*/}
                                    <div className="card mb-0 transaction-box" style={{padding: "20px 90px 20px 90px", backgroundColor:"#404e77",marginRight: "1px"}}>
                                       <TabContainer dir={themeLang.direction}>
                                          <RctCardContent>
                                          <div className="cardCont" style={{background: "white", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
                                             <div className="logo">                        
                                                <img className="img-logo" src={form.fileLogo ? form.fileLogo:''} style={{width: `${form.sizeLogoMobile}px`}} alt="" />
                                             </div>
                                             <form className="formulario"  action="" style={{background: `rgba(${form.backgroundColorForm.r }, ${form.backgroundColorForm.g }, ${form.backgroundColorForm.b }, ${form.backgroundColorForm.a })`}}>
                                                <div className="titleForm" style={{color:`rgba(${form.colorTitleForm.r }, ${form.colorTitleForm.g }, ${form.colorTitleForm.b }, ${form.colorTitleForm.a })`}}>{form.titlePortal}</div>
                                                <div className="form-row">
                                                { form.nombre ?
                                                   <div className="form-group col-md-12 colorPlaceHolder" name="form_group_nombre" id="form_group_nombre">
                                                      <input className="" type="text" autoComplete="off" className="form-control form-control-sm" id="nombre" name="nombre" placeholder="Nombre" />
                                                   </div>
                                                   :
                                                   <div></div>
                                                }
                                                { form.apellidos ?
                                                   <div className="form-group col-md-12 colorPlaceHolder" name="form_group_apellidos" id="form_group_apellidos">
                                                      <input className="" type="text" autoComplete="off"  className="form-control form-control-sm" id="apellidos" name="apellidos" placeholder="Apellidos"/>
                                                   </div>
                                                :
                                                <div></div>
                                                }
                                                </div>
                                                   { form.email ? 
                                                   <div className="form-group colorPlaceHolder" id="form_group_email"  name="form_group_email">
                                                      <input className="colorPlaceHolder" type="email" autoComplete="off" className="form-control form-control-sm" id="email" name="email" placeholder="Correo Electrónico" />
                                                   </div>
                                                   :
                                                   <div></div>
                                                   }
                                                   { form.telefono ?
                                                   <div className="form-group colorPlaceHolder" id="form_group_telefono"  name="form_group_telefono">
                                                      <input className="colorPlaceHolder" type="tel" autoComplete="off" className="form-control form-control-sm" id="telefono" name="telefono" placeholder="Telefono" />
                                                   </div>
                                                   :
                                                   <div></div>
                                                   }
                                                   { form.edad ?
                                                   <div className="form-group colorPlaceHolder" id="form_group_edad"  name="form_group_edad">
                                                      <input className="colorPlaceHolder" type="text" autoComplete="off" className="form-control form-control-sm" id="edad" name="edad" placeholder="Edad" />
                                                   </div>
                                                      :
                                                   <div></div>
                                                   }
                                                   { form.genero ?
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
                                                   { form.num_habitacion ?
                                                   <div className="form-group colorPlaceHolder" id="form_group_habitacion"  name="form_group_habitacion">
                                                      <input type="text" autoComplete="off" className="form-control form-control-sm" id="num_habitacion" name="num_habitacion" placeholder="Ingrese el número de habitación" />
                                                   </div>
                                                      :
                                                   <div></div>
                                                   }
                                                   { form.num_voucher ?
                                                   <div className="form-group colorPlaceHolder" id="form_group_voucher" name="form_group_voucher">
                                                      <input type="text"  autoComplete="off" className="form-control form-control-sm" id="num_voucher" name="num_voucher" placeholder="Ingrese el pin acceso a internet" />
                                                   </div>
                                                      :
                                                   <div></div>
                                                   }
                                                   { form.razon_visita ?
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
                                                               label={<a  style={{fontSize: "13px",color:`rgba(${form.colorFontForm.r }, ${form.colorFontForm.g }, ${form.colorFontForm.b }, ${form.colorFontForm.a })`}}>Aceptar Terminos y Condiciones</a>}
                                                            />
                                                         
                                                         </div>
                                                   </div>

                                                   <div className="form-btn">
                                                      <button type="button" id="submit" className="btn" style={{background:`rgba(${form.buttonColors.r }, ${form.buttonColors.g }, ${form.buttonColors.b }, ${form.buttonColors.a })`, color:`rgba(${form.buttonColorsFont.r }, ${form.buttonColorsFont.g }, ${form.buttonColorsFont.b }, ${form.buttonColorsFont.a })`}}>Continuar</button>
                                                   </div>     
                                             </form>
                                          </div>
                                          </RctCardContent>
                                       </TabContainer>
                                    </div>
                                    </SwipeableViews>
                                 </div>
                              :!form.fileBackground && form.type_form_two ?
                              <div className="Tab-wrap" style={{ padding:"1px"}}>
                              {/* --------formulario 2 --------- previsualización pc*/}
                                 <AppBar position="static" >
                                    <Tabs
                                       value={this.state.valueViewsFormat}
                                       onChange={this.handleChangeTabsViewsFormat}
                                       indicatorColor="primary"
                                       textColor="primary"
                                       variant="standard"
                                    >
                                       <Tab label={'Web'} />
                                       <Tab label={'Móvil'} />
                                    </Tabs>
                                 </AppBar>
                                 <SwipeableViews
                                    axis={themeLang.direction === 'rtl' ? 'x-reverse' : 'x'}
                                    index={this.state.valueViewsFormat}
                                    onChangeIndex={this.handleChangeTabsIndexViewsFormat}
                                 >
                                 <div className="card mb-0 transaction-box" style={{padding: "26px 5px 10px 5px", backgroundColor:"#404e77",marginRight: "1px"}}>
                                    <TabContainer dir={themeLang.direction}>
                                       <RctCardContent >
                                       <div className="rct-block-content blockContent2" style={{backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
                                       {form.static_form ?
                                             <div className="cardCont2" style={{background: 'rgba(68, 196, 231, 0.54)'}}>
                                                <div className="logo">                        
                                                   <img className="img-logo" src={form.fileLogo ? form.fileLogo:''} style={{width: '280px'}} alt="" />
                                                   
                                                </div>
                                                   <form className="formulario2"  action="" style={{background: '#fff'}}>
                                                      <div className="titleForm2" style={{color:'#44c4e7'}}>{form.titlePortal}</div>
                                                      <div className="form-row">
                                                      { form.nombre ?
                                                         <div className="form-group col-md-12 colorPlaceHolder2" name="form_group_nombre" id="form_group_nombre">
                                                            <input className="" type="text" autoComplete="off" className="form-control form-control-sm" id="nombre" name="nombre" placeholder="Nombre" />
                                                         </div>
                                                         :
                                                         <div></div>
                                                      }
                                                      { form.apellidos ?
                                                         <div className="form-group col-md-12 colorPlaceHolder2" name="form_group_apellidos" id="form_group_apellidos">
                                                            <input className="" type="text" autoComplete="off"  className="form-control form-control-sm" id="apellidos" name="apellidos" placeholder="Apellidos"/>
                                                         </div>
                                                      :
                                                      <div></div>
                                                      }
                                                      </div>
                                                      { form.email ? 
                                                      <div className="form-group colorPlaceHolder2" id="form_group_email"  name="form_group_email">
                                                         <input className="colorPlaceHolder" type="email" autoComplete="off" className="form-control form-control-sm" id="email" name="email" placeholder="Correo Electrónico" />
                                                      </div>
                                                      :
                                                      <div></div>
                                                      }
                                                      { form.telefono ?
                                                      <div className="form-group colorPlaceHolder2" id="form_group_telefono"  name="form_group_telefono">
                                                         <input className="colorPlaceHolder" type="tel" autoComplete="off" className="form-control form-control-sm" id="telefono" name="telefono" placeholder="Telefono" />
                                                      </div>
                                                      :
                                                      <div></div>
                                                      }
                                                      { form.edad ?
                                                      <div className="form-group colorPlaceHolder2" id="form_group_edad"  name="form_group_edad">
                                                         <input className="colorPlaceHolder" type="text" autoComplete="off" className="form-control form-control-sm" id="edad" name="edad" placeholder="Edad" />
                                                      </div>
                                                         :
                                                      <div></div>
                                                      }
                                                      { form.genero ?
                                                      <div className="form-group colorPlaceHolder2" id="form_group_genero"  name="form_group_genero">
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
                                                      { form.num_habitacion ?
                                                      <div className="form-group colorPlaceHolder2" id="form_group_habitacion"  name="form_group_habitacion">
                                                         <input type="text" autoComplete="off" className="form-control form-control-sm" id="num_habitacion" name="num_habitacion" placeholder="Ingrese el número de habitación" />
                                                      </div>
                                                         :
                                                      <div></div>
                                                      }
                                                      { form.num_voucher ?
                                                      <div className="form-group colorPlaceHolder2" id="form_group_voucher" name="form_group_voucher">
                                                         <input type="text"  autoComplete="off" className="form-control form-control-sm" id="num_voucher" name="num_voucher" placeholder="Ingrese el pin acceso a internet" />
                                                      </div>
                                                         :
                                                      <div></div>
                                                      }
                                                      { form.razon_visita ?
                                                      <div className="form-group colorPlaceHolder2" id="form_group_razon_visita"  name="form_group_razon_visita">
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
                                                      <div className="form-group check-terminos colorPlaceHolder2" id="form_group_check" name="form_group_check">
                                                            <div className="custom-control custom-switch">
                                                               <input type="checkbox" className="custom-control-input" id="customSwitches" name="customSwitches" />
                                                               

                                                               <FormControlLabel
                                                                  control={
                                                                     <IOSSwitch
                                                                        checked={this.state.checkedB}
                                                                        onChange={this.handleSwitch('checkedB')}
                                                                        value="checkedB"
                                                                        color="primary"
                                                                     />
                                                                     
                                                                  }
                                                                  // label={<a href="#popup" style={{color:colorFontForm}}>Terminos y Condiciones</a>}
                                                                  label={<a  style={{fontSize: "10px",color:'#000'}}>Aceptar Terminos y Condiciones</a>}
                                                               />
                                                            
                                                            </div>
                                                      </div>

                                                      <div className="form-btn">
                                                         <button type="button" id="submit" className="btn" style={{backgroundColor:'#44c4e7', color:"#fff"}}>Continuar</button>
                                                      </div>     
                                                   </form>
                                                </div>
                                                :
                                                <div className="cardCont2" style={{background: `rgba(${form.backgroundColor.r }, ${form.backgroundColor.g }, ${form.backgroundColor.b }, ${form.backgroundColor.a })`}}>
                                                   <div className="logo">                        
                                                      <img className="img-logo" src={form.fileLogo ? form.fileLogo:''} style={{width: `${form.sizeLogoWeb}px`}} alt="" />
                                                      
                                                   </div>
                                                   <form className="formulario2"  action="" style={{background: `rgba(${form.backgroundColorForm.r }, ${form.backgroundColorForm.g }, ${form.backgroundColorForm.b }, ${form.backgroundColorForm.a })`}}>
                                                      <div className="titleForm2" style={{color:`rgba(${form.colorTitleForm.r }, ${form.colorTitleForm.g }, ${form.colorTitleForm.b }, ${form.colorTitleForm.a })`}}>{form.titlePortal}</div>
                                                      <div className="form-row">
                                                      { form.nombre ?
                                                         <div className="form-group col-md-12 colorPlaceHolder2" name="form_group_nombre" id="form_group_nombre">
                                                            <input className="" type="text" autoComplete="off" className="form-control form-control-sm" id="nombre" name="nombre" placeholder="Nombre" />
                                                         </div>
                                                         :
                                                         <div></div>
                                                      }
                                                      { form.apellidos ?
                                                         <div className="form-group col-md-12 colorPlaceHolder2" name="form_group_apellidos" id="form_group_apellidos">
                                                            <input className="" type="text" autoComplete="off"  className="form-control form-control-sm" id="apellidos" name="apellidos" placeholder="Apellidos"/>
                                                         </div>
                                                      :
                                                      <div></div>
                                                      }
                                                   </div>
                                                      { form.email ? 
                                                      <div className="form-group colorPlaceHolder2" id="form_group_email"  name="form_group_email">
                                                         <input className="colorPlaceHolder" type="email" autoComplete="off" className="form-control form-control-sm" id="email" name="email" placeholder="Correo Electrónico" />
                                                      </div>
                                                      :
                                                      <div></div>
                                                      }
                                                      { form.telefono ?
                                                      <div className="form-group colorPlaceHolder2" id="form_group_telefono"  name="form_group_telefono">
                                                         <input className="colorPlaceHolder" type="tel" autoComplete="off" className="form-control form-control-sm" id="telefono" name="telefono" placeholder="Telefono" />
                                                      </div>
                                                      :
                                                      <div></div>
                                                      }
                                                      { form.edad ?
                                                      <div className="form-group colorPlaceHolder2" id="form_group_edad"  name="form_group_edad">
                                                         <input className="colorPlaceHolder" type="text" autoComplete="off" className="form-control form-control-sm" id="edad" name="edad" placeholder="Edad" />
                                                      </div>
                                                         :
                                                      <div></div>
                                                      }
                                                      { form.genero ?
                                                      <div className="form-group colorPlaceHolder2" id="form_group_genero"  name="form_group_genero">
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
                                                      { form.num_habitacion ?
                                                      <div className="form-group colorPlaceHolder2" id="form_group_habitacion"  name="form_group_habitacion">
                                                         <input type="text" autoComplete="off" className="form-control form-control-sm" id="num_habitacion" name="num_habitacion" placeholder="Ingrese el número de habitación" />
                                                      </div>
                                                         :
                                                      <div></div>
                                                      }
                                                      { form.num_voucher ?
                                                      <div className="form-group colorPlaceHolder2" id="form_group_voucher" name="form_group_voucher">
                                                         <input type="text"  autoComplete="off" className="form-control form-control-sm" id="num_voucher" name="num_voucher" placeholder="Ingrese el pin acceso a internet" />
                                                      </div>
                                                         :
                                                      <div></div>
                                                      }
                                                      { form.razon_visita ?
                                                      <div className="form-group colorPlaceHolder2" id="form_group_razon_visita"  name="form_group_razon_visita">
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
                                                      <div className="form-group check-terminos colorPlaceHolder2" id="form_group_check" name="form_group_check">
                                                            <div className="custom-control custom-switch">
                                                               <input type="checkbox" className="custom-control-input" id="customSwitches" name="customSwitches" />
                                                               

                                                               <FormControlLabel
                                                                  control={
                                                                     <IOSSwitch
                                                                        checked={this.state.checkedB}
                                                                        onChange={this.handleSwitch('checkedB')}
                                                                        value="checkedB"
                                                                        color="primary"
                                                                     />
                                                                     
                                                                  }
                                                                  // label={<a href="#popup" style={{color:colorFontForm}}>Terminos y Condiciones</a>}
                                                                  label={<a  style={{fontSize: "10px",color:`rgba(${form.colorFontForm.r }, ${form.colorFontForm.g }, ${form.colorFontForm.b }, ${form.colorFontForm.a })`}}>Aceptar Terminos y Condiciones</a>}
                                                               />
                                                            
                                                            </div>
                                                      </div>

                                                      <div className="form-btn">
                                                         <button type="button" id="submit" className="btn" style={{backgroundColor:`rgba(${form.buttonColors.r }, ${form.buttonColors.g }, ${form.buttonColors.b }, ${form.buttonColors.a })`, color:`rgba(${form.buttonColorsFont.r }, ${form.buttonColorsFont.g }, ${form.buttonColorsFont.b }, ${form.buttonColorsFont.a })`}}>Continuar</button>
                                                      </div>     
                                                   </form>
                                                </div>
                                             }
                                          </div>
                                       </RctCardContent>
                                    </TabContainer>
                                 </div>
                                 {/*----------------- previsualizacion móvil*/}
                                 <div className="card mb-0 transaction-box" style={{padding: "20px 90px 20px 90px", backgroundColor:"#404e77",marginRight: "1px"}}>
                                    <TabContainer dir={themeLang.direction}>
                                       <RctCardContent>
                                       <div className="rct-block-content blockContent2" style={{backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                                       <div className="cardCont3" style={{background: `rgba(${form.backgroundColor.r }, ${form.backgroundColor.g }, ${form.backgroundColor.b }, ${form.backgroundColor.a })`}}>
                                             <div className="logo">                        
                                                <img className="img-logo" src={form.fileLogo ? form.fileLogo:''} style={{width: `${form.sizeLogoMobile}px`}} alt="" />
                                             </div>
                                             <form className="formulario2B"  action="" style={{background: `rgba(${form.backgroundColorForm.r }, ${form.backgroundColorForm.g }, ${form.backgroundColorForm.b }, ${form.backgroundColorForm.a })`}}>
                                                <div className="titleForm2" style={{color:`rgba(${form.colorTitleForm.r }, ${form.colorTitleForm.g }, ${form.colorTitleForm.b }, ${form.colorTitleForm.a })`}}>{form.titlePortal}</div>
                                                <div className="form-row">
                                                { form.nombre ?
                                                   <div className="form-group col-md-12 colorPlaceHolder2" name="form_group_nombre" id="form_group_nombre">
                                                      <input className="" type="text" autoComplete="off" className="form-control form-control-sm" id="nombre" name="nombre" placeholder="Nombre" />
                                                   </div>
                                                   :
                                                   <div></div>
                                                }
                                                { form.apellidos ?
                                                   <div className="form-group col-md-12 colorPlaceHolder2" name="form_group_apellidos" id="form_group_apellidos">
                                                      <input className="" type="text" autoComplete="off"  className="form-control form-control-sm" id="apellidos" name="apellidos" placeholder="Apellidos"/>
                                                   </div>
                                                :
                                                <div></div>
                                                }
                                                </div>
                                                   { form.email ? 
                                                   <div className="form-group colorPlaceHolder2" id="form_group_email"  name="form_group_email">
                                                      <input className="colorPlaceHolder" type="email" autoComplete="off" className="form-control form-control-sm" id="email" name="email" placeholder="Correo Electrónico" />
                                                   </div>
                                                   :
                                                   <div></div>
                                                   }
                                                   { form.telefono ?
                                                   <div className="form-group colorPlaceHolder2" id="form_group_telefono"  name="form_group_telefono">
                                                      <input className="colorPlaceHolder" type="tel" autoComplete="off" className="form-control form-control-sm" id="telefono" name="telefono" placeholder="Telefono" />
                                                   </div>
                                                   :
                                                   <div></div>
                                                   }
                                                   { form.edad ?
                                                   <div className="form-group colorPlaceHolder2" id="form_group_edad"  name="form_group_edad">
                                                      <input className="colorPlaceHolder" type="text" autoComplete="off" className="form-control form-control-sm" id="edad" name="edad" placeholder="Edad" />
                                                   </div>
                                                      :
                                                   <div></div>
                                                   }
                                                   { form.genero ?
                                                   <div className="form-group colorPlaceHolder2" id="form_group_genero"  name="form_group_genero">
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
                                                   { form.num_habitacion ?
                                                   <div className="form-group colorPlaceHolder2" id="form_group_habitacion"  name="form_group_habitacion">
                                                      <input type="text" autoComplete="off" className="form-control form-control-sm" id="num_habitacion" name="num_habitacion" placeholder="Ingrese el número de habitación" />
                                                   </div>
                                                      :
                                                   <div></div>
                                                   }
                                                   { form.num_voucher ?
                                                   <div className="form-group colorPlaceHolder2" id="form_group_voucher" name="form_group_voucher">
                                                      <input type="text"  autoComplete="off" className="form-control form-control-sm" id="num_voucher" name="num_voucher" placeholder="Ingrese el pin acceso a internet" />
                                                   </div>
                                                      :
                                                   <div></div>
                                                   }
                                                   { form.razon_visita ?
                                                   <div className="form-group colorPlaceHolder2" id="form_group_razon_visita"  name="form_group_razon_visita">
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
                                                               label={<a  style={{fontSize: "10px",color:`rgba(${form.colorFontForm.r }, ${form.colorFontForm.g }, ${form.colorFontForm.b }, ${form.colorFontForm.a })`}}>Aceptar Terminos y Condiciones</a>}
                                                            />
                                                         
                                                         </div>
                                                   </div>

                                                   <div className="form-btn">
                                                      <button type="button" id="submit" className="btn" style={{background:`rgba(${form.buttonColors.r }, ${form.buttonColors.g }, ${form.buttonColors.b }, ${form.buttonColors.a })`, color:`rgba(${form.buttonColorsFont.r }, ${form.buttonColorsFont.g }, ${form.buttonColorsFont.b }, ${form.buttonColorsFont.a })`}}>Continuar</button>
                                                   </div>     
                                             </form>
                                          </div>
                                       </div>
                                       </RctCardContent>
                                    </TabContainer>
                                 </div>
                                 </SwipeableViews>
                              </div> 
                              :!form.fileBackground && form.type_form_three &&
                              <div className="Tab-wrap" style={{ padding:"1px"}}>
                              {/* --------formulario 3 --------- previsualización pc*/}
                                 <AppBar position="static" >
                                    <Tabs
                                       value={this.state.valueViewsFormat}
                                       onChange={this.handleChangeTabsViewsFormat}
                                       indicatorColor="primary"
                                       textColor="primary"
                                       variant="standard"
                                    >
                                       <Tab label={'Web'} />
                                       <Tab label={'Móvil'} />
                                    </Tabs>
                                 </AppBar>
                                 <SwipeableViews
                                    axis={themeLang.direction === 'rtl' ? 'x-reverse' : 'x'}
                                    index={this.state.valueViewsFormat}
                                    onChangeIndex={this.handleChangeTabsIndexViewsFormat}
                                 >
                                 <div className="card mb-0 transaction-box" style={{padding: "26px 5px 10px 5px", backgroundColor:"#404e77",marginRight: "1px"}}>
                                    <TabContainer dir={themeLang.direction}>
                                       <RctCardContent >
                                       <div className="rct-block-content blockContent3" style={{ backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
                                       <div className="cardCont3" style={{background: `rgba(${form.backgroundColor.r }, ${form.backgroundColor.g }, ${form.backgroundColor.b }, ${form.backgroundColor.a })`}}>
                                             
                                          <form className="formulario3"  action="" style={{background: `rgba(${form.backgroundColorForm.r }, ${form.backgroundColorForm.g }, ${form.backgroundColorForm.b }, ${form.backgroundColorForm.a })`}}>
                                             <div className="logo3">                        
                                                <img className="img-logo" src={form.fileLogo ? form.fileLogo:''} style={{width: `${form.sizeLogoWeb}px`}} alt="" />
                                             </div>
                                             <div className="titleForm3" style={{color:`rgba(${form.colorTitleForm.r }, ${form.colorTitleForm.g }, ${form.colorTitleForm.b }, ${form.colorTitleForm.a })`}}>{form.titlePortal}</div>
                                                <div className="form-row">
                                                { form.nombre ?
                                                   <div className="form-group col-md-12 colorPlaceHolder3" name="form_group_nombre" id="form_group_nombre">
                                                      <input className="" type="text" autoComplete="off" className="form-control form-control-sm" id="nombre" name="nombre" placeholder="Nombre" />
                                                   </div>
                                                   :
                                                   <div></div>
                                                }
                                                { form.apellidos ?
                                                   <div className="form-group col-md-12 colorPlaceHolder3" name="form_group_apellidos" id="form_group_apellidos">
                                                      <input className="" type="text" autoComplete="off"  className="form-control form-control-sm" id="apellidos" name="apellidos" placeholder="Apellidos"/>
                                                   </div>
                                                :
                                                <div></div>
                                                }
                                                </div>
                                                   { form.email ? 
                                                   <div className="form-group colorPlaceHolder3" id="form_group_email"  name="form_group_email">
                                                      <input className="colorPlaceHolder" type="email" autoComplete="off" className="form-control form-control-sm" id="email" name="email" placeholder="Correo Electrónico" />
                                                   </div>
                                                   :
                                                   <div></div>
                                                   }
                                                   { form.telefono ?
                                                   <div className="form-group colorPlaceHolder3" id="form_group_telefono"  name="form_group_telefono">
                                                      <input className="colorPlaceHolder" type="tel" autoComplete="off" className="form-control form-control-sm" id="telefono" name="telefono" placeholder="Telefono" />
                                                   </div>
                                                   :
                                                   <div></div>
                                                   }
                                                   { form.edad ?
                                                   <div className="form-group colorPlaceHolder3" id="form_group_edad"  name="form_group_edad">
                                                      <input className="colorPlaceHolder" type="text" autoComplete="off" className="form-control form-control-sm" id="edad" name="edad" placeholder="Edad" />
                                                   </div>
                                                      :
                                                   <div></div>
                                                   }
                                                   { form.genero ?
                                                   <div className="form-group colorPlaceHolder3" id="form_group_genero"  name="form_group_genero">
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
                                                   { form.num_habitacion ?
                                                   <div className="form-group colorPlaceHolder3" id="form_group_habitacion"  name="form_group_habitacion">
                                                      <input type="text" autoComplete="off" className="form-control form-control-sm" id="num_habitacion" name="num_habitacion" placeholder="Ingrese el número de habitación" />
                                                   </div>
                                                      :
                                                   <div></div>
                                                   }
                                                   { form.num_voucher ?
                                                   <div className="form-group colorPlaceHolder3" id="form_group_voucher" name="form_group_voucher">
                                                      <input type="text"  autoComplete="off" className="form-control form-control-sm" id="num_voucher" name="num_voucher" placeholder="Ingrese el pin acceso a internet" />
                                                   </div>
                                                      :
                                                   <div></div>
                                                   }
                                                   { form.razon_visita ?
                                                   <div className="form-group colorPlaceHolder3" id="form_group_razon_visita"  name="form_group_razon_visita">
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
                                                   <div className="form-group check-terminos colorPlaceHolder3" id="form_group_check" name="form_group_check">
                                                         <div className="custom-control custom-switch">
                                                            <input type="checkbox" className="custom-control-input" id="customSwitches" name="customSwitches" />
                                                            

                                                            <FormControlLabel
                                                               control={
                                                                  <IOSSwitch
                                                                     checked={this.state.checkedB}
                                                                     onChange={this.handleSwitch('checkedB')}
                                                                     value="checkedB"
                                                                     color="primary"
                                                                  />
                                                                  
                                                               }
                                                               // label={<a href="#popup" style={{color:colorFontForm}}>Terminos y Condiciones</a>}
                                                               label={<a  style={{fontSize: "12px",color:`rgba(${form.colorFontForm.r }, ${form.colorFontForm.g }, ${form.colorFontForm.b }, ${form.colorFontForm.a })`}}>Aceptar Terminos y Condiciones</a>}
                                                            />
                                                         
                                                         </div>
                                                   </div>

                                                   <div className="form-btn">
                                                      <button type="button" id="submit" className="btn btnStyle3" style={{background:`rgba(${form.buttonColors.r }, ${form.buttonColors.g }, ${form.buttonColors.b }, ${form.buttonColors.a })`, color:`rgba(${form.buttonColorsFont.r }, ${form.buttonColorsFont.g }, ${form.buttonColorsFont.b }, ${form.buttonColorsFont.a })`}}>Continuar</button>
                                                   </div>     
                                                </form>
                                             </div>
                                          </div>
                                       </RctCardContent>
                                    </TabContainer>
                                 </div>
                                 {/*----------------- previsualizacion móvil*/}
                                 <div className="card mb-0 transaction-box" style={{padding: "20px 90px 65px 20px", backgroundColor:"#404e77",marginRight: "1px"}}>
                                    <TabContainer dir={themeLang.direction}>
                                       <RctCardContent>
                                       <div className="rct-block-content blockContent3" style={{ backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                                       <div className="cardCont3" style={{background: `rgba(${form.backgroundColor.r }, ${form.backgroundColor.g }, ${form.backgroundColor.b }, ${form.backgroundColor.a })`}}>
                                             
                                          <form className="formulario3B"  action="" style={{background: `rgba(${form.backgroundColorForm.r }, ${form.backgroundColorForm.g }, ${form.backgroundColorForm.b }, ${form.backgroundColorForm.a })`}}>
                                             <div className="logo3">                        
                                                <img className="img-logo" src={form.fileLogo ? form.fileLogo:''} style={{width: `${form.sizeLogoMobile}px`}} alt="" />
                                             </div>
                                             <div className="titleForm3" style={{fontSize:"12px", color:`rgba(${form.colorTitleForm.r }, ${form.colorTitleForm.g }, ${form.colorTitleForm.b }, ${form.colorTitleForm.a })`}}>{form.titlePortal}</div>
                                                <div className="form-row">
                                                { form.nombre ?
                                                   <div className="form-group col-md-12 colorPlaceHolder3" name="form_group_nombre" id="form_group_nombre">
                                                      <input className="" type="text" autoComplete="off" className="form-control form-control-sm" id="nombre" name="nombre" placeholder="Nombre" />
                                                   </div>
                                                   :
                                                   <div></div>
                                                }
                                                { form.apellidos ?
                                                   <div className="form-group col-md-12 colorPlaceHolder3" name="form_group_apellidos" id="form_group_apellidos">
                                                      <input className="" type="text" autoComplete="off"  className="form-control form-control-sm" id="apellidos" name="apellidos" placeholder="Apellidos"/>
                                                   </div>
                                                :
                                                <div></div>
                                                }
                                                </div>
                                                   { form.email ? 
                                                   <div className="form-group colorPlaceHolder3" id="form_group_email"  name="form_group_email">
                                                      <input className="colorPlaceHolder" type="email" autoComplete="off" className="form-control form-control-sm" id="email" name="email" placeholder="Correo Electrónico" />
                                                   </div>
                                                   :
                                                   <div></div>
                                                   }
                                                   { form.telefono ?
                                                   <div className="form-group colorPlaceHolder3" id="form_group_telefono"  name="form_group_telefono">
                                                      <input className="colorPlaceHolder" type="tel" autoComplete="off" className="form-control form-control-sm" id="telefono" name="telefono" placeholder="Telefono" />
                                                   </div>
                                                   :
                                                   <div></div>
                                                   }
                                                   { form.edad ?
                                                   <div className="form-group colorPlaceHolder3" id="form_group_edad"  name="form_group_edad">
                                                      <input className="colorPlaceHolder" type="text" autoComplete="off" className="form-control form-control-sm" id="edad" name="edad" placeholder="Edad" />
                                                   </div>
                                                      :
                                                   <div></div>
                                                   }
                                                   { form.genero ?
                                                   <div className="form-group colorPlaceHolder3" id="form_group_genero"  name="form_group_genero">
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
                                                   { form.num_habitacion ?
                                                   <div className="form-group colorPlaceHolder3" id="form_group_habitacion"  name="form_group_habitacion">
                                                      <input type="text" autoComplete="off" className="form-control form-control-sm" id="num_habitacion" name="num_habitacion" placeholder="Ingrese el número de habitación" />
                                                   </div>
                                                      :
                                                   <div></div>
                                                   }
                                                   { form.num_voucher ?
                                                   <div className="form-group colorPlaceHolder3" id="form_group_voucher" name="form_group_voucher">
                                                      <input type="text"  autoComplete="off" className="form-control form-control-sm" id="num_voucher" name="num_voucher" placeholder="Ingrese el pin acceso a internet" />
                                                   </div>
                                                      :
                                                   <div></div>
                                                   }
                                                   { form.razon_visita ?
                                                   <div className="form-group colorPlaceHolder3" id="form_group_razon_visita"  name="form_group_razon_visita">
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
                                                   <div className="form-group check-terminos colorPlaceHolder3" id="form_group_check" name="form_group_check">
                                                         <div className="custom-control custom-switch">
                                                            <input type="checkbox" className="custom-control-input" id="customSwitches" name="customSwitches" />
                                                            

                                                            <FormControlLabel
                                                               control={
                                                                  <IOSSwitch
                                                                     checked={this.state.checkedB}
                                                                     onChange={this.handleSwitch('checkedB')}
                                                                     value="checkedB"
                                                                     color="primary"
                                                                  />
                                                                  
                                                               }
                                                               // label={<a href="#popup" style={{color:colorFontForm}}>Terminos y Condiciones</a>}
                                                               label={<a  style={{fontSize: "10px",color:`rgba(${form.colorFontForm.r }, ${form.colorFontForm.g }, ${form.colorFontForm.b }, ${form.colorFontForm.a })`}}>Aceptar Terminos y Condiciones</a>}
                                                            />
                                                         
                                                         </div>
                                                   </div>

                                                   <div className="form-btn">
                                                      <button type="button" id="submit" className="btn btnStyle3" style={{background:`rgba(${form.buttonColors.r }, ${form.buttonColors.g }, ${form.buttonColors.b }, ${form.buttonColors.a })`, color:`rgba(${form.buttonColorsFont.r }, ${form.buttonColorsFont.g }, ${form.buttonColorsFont.b }, ${form.buttonColorsFont.a })`}}>Continuar</button>
                                                   </div>     
                                                </form>
                                             </div>
                                          </div>
                                       </RctCardContent>
                                    </TabContainer>
                                 </div>
                                 </SwipeableViews>
                              </div>
                              }
                        </div>
                     </CardContent>
                  </div>
               </div>
            </Card>
         </div>
      );
   }
}
