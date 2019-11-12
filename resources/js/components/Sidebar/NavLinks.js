// sidebar nav links
export default {
   category1: [
      {
         "menu_title": "sidebar.dashboard",
         "menu_icon": "zmdi zmdi-view-dashboard",
         "type_multi": null,
         "new_item": true,
         "child_routes": [
            {
               "menu_title": "sidebar.ecommerce",
               "new_item": false,
               "path": "/app/dashboard/ecommerce"
            },
            {
               "path": "/dashboard/crm/dashboard",
               "new_item": true,
               "menu_title": "sidebar.crm"
            },
            {
               "path": "/horizontal/dashboard/saas",
               "new_item": false,
               "menu_title": "sidebar.saas"
            },
            {
               "path": "/agency/dashboard/agency",
               "new_item": false,
               "menu_title": "sidebar.agency"
            },
            {
               "path": "/boxed/dashboard/news",
               "new_item": false,
               "menu_title": "sidebar.news"
            },
         ]
      },
      {
         "menu_title": "sidebar.crm",
         "menu_icon": "zmdi zmdi-book",
         "type_multi": null,
         "new_item": true,
         "child_routes": [
            {
               "path": "/dashboard/crm/projects",
               "new_item": true,
               "menu_title": "sidebar.projects"
            },
            {
               "path": "/dashboard/crm/clients",
               "new_item": true,
               "menu_title": "sidebar.clients"
            },
            {
               "path": "/dashboard/crm/reports",
               "new_item": true,
               "menu_title": "sidebar.reports"
            }
         ]
      },
      {
         "menu_title": "sidebar.ecommerce",
         "menu_icon": "zmdi zmdi-shopping-cart",
         "type_multi": null,
         "new_item": false,
         "child_routes": [
            {
               "path": "/app/ecommerce/shop",
               "new_item": false,
               "menu_title": "sidebar.shop"
            },
            {
               "path": "/app/ecommerce/cart",
               "new_item": false,
               "menu_title": "sidebar.cart"
            },
            {
               "path": "/app/ecommerce/checkout",
               "new_item": false,
               "menu_title": "sidebar.checkout"
            },
            {
               "path": "/app/ecommerce/shop-list",
               "new_item": false,
               "menu_title": "sidebar.shopList"
            },
            {
               "path": "/app/ecommerce/shop-grid",
               "new_item": false,
               "menu_title": "sidebar.shopGrid"
            },
            {
               "path": "/app/ecommerce/invoice",
               "new_item": false,
               "menu_title": "sidebar.invoice"
            }
         ]
      },
      {
         "menu_title": "sidebar.widgets",
         "menu_icon": "zmdi zmdi-widgets",
         "path": "/app/widgets",
         "type_multi": null,
         "new_item": false,
         "child_routes": [
            {
               "path": "/app/widgets/charts",
               "new_item": false,
               "menu_title": "sidebar.charts"
            },
            {
               "path": "/app/widgets/promo",
               "new_item": false,
               "menu_title": "sidebar.promo"
            },
            {
               "path": "/app/widgets/general",
               "new_item": false,
               "menu_title": "sidebar.general"
            },
            {
               "path": "/app/widgets/user",
               "new_item": false,
               "menu_title": "sidebar.user"
            },


         ]
      },
      {
         "menu_title": "sidebar.pages",
         "menu_icon": "zmdi zmdi-file-plus",
         "type_multi": null,
         "new_item": false,
         "child_routes": [
            {
               "path": "/app/pages/gallery",
               "new_item": false,
               "menu_title": "sidebar.gallery"
            },
            {
               "path": "/app/pages/pricing",
               "new_item": false,
               "menu_title": "sidebar.pricing"
            },
            {
               "path": "/app/pages/blank",
               "menu_title": "sidebar.blank"
            },
            {
               "path": "/terms-condition",
               "menu_title": "sidebar.terms&Conditions"
            },
            {
               "path": "/app/pages/feedback",
               "menu_title": "sidebar.feedback"
            },
            {
               "path": "/app/pages/report",
               "menu_title": "sidebar.report"
            },
            {
               "path": "/app/pages/faq",
               "menu_title": "sidebar.faq(s)"
            }
         ]
      },
      {
         "menu_title": "sidebar.session",
         "menu_icon": "zmdi zmdi-time-interval",
         "type_multi": null,
         "new_item": false,
         "child_routes": [
            {
               "path": "/session/login",
               "new_item": false,
               "menu_title": "sidebar.login"
            },
            {
               "path": "/session/register",
               "new_item": false,
               "menu_title": "sidebar.register"
            },
            {
               "path": "/session/lock-screen",
               "new_item": false,
               "menu_title": "sidebar.lockScreen"
            },
            {
               "path": "/session/forgot-password",
               "new_item": false,
               "menu_title": "sidebar.forgotPassword"
            },
            {
               "path": "/session/404",
               "new_item": false,
               "menu_title": "sidebar.404"
            },
            {
               "path": "/session/500",
               "new_item": false,
               "menu_title": "sidebar.500"
            }
         ]
      }
   ],
   category2: [
      {
         "menu_title": "sidebar.inbox",
         "menu_icon": "zmdi zmdi-email",
         "path": "/app/mail",
         "new_item": false,
         "child_routes": null
      },
      {
         "menu_title": "sidebar.chat",
         "menu_icon": "zmdi zmdi-comments",
         "path": "/app/chat",
         "new_item": false,
         "child_routes": null
      },
      {
         "menu_title": "sidebar.toDo",
         "menu_icon": "zmdi zmdi-comment-text-alt",
         "path": "/app/todo",
         "new_item": false,
         "child_routes": null
      }
   ],
   category3: [
      {
         "menu_title": "sidebar.uiComponents",
         "menu_icon": "zmdi zmdi-wrench",
         "type_multi": null,
         "new_item": false,
         "child_routes": [
            {
               "path": "/app/ui-components/alerts",
               "new_item": false,
               "menu_title": "sidebar.alerts"
            },
            {
               "path": "/app/ui-components/app-bar",
               "new_item": false,
               "menu_title": "sidebar.appBar"
            },
            {
               "path": "/app/ui-components/avatars",
               "new_item": false,
               "menu_title": "sidebar.avatars"
            },
            {
               "path": "/app/ui-components/buttons",
               "new_item": false,
               "menu_title": "sidebar.buttons"
            },
            {
               "path": "/app/ui-components/bottom-navigations",
               "new_item": false,
               "menu_title": "sidebar.bottomNavigations"
            },
            {
               "path": "/app/ui-components/badges",
               "new_item": false,
               "menu_title": "sidebar.badges"
            },
            {
               "path": "/app/ui-components/cards",
               "new_item": false,
               "menu_title": "sidebar.cards"
            },
            {
               "path": "/app/ui-components/cards-masonry",
               "new_item": false,
               "menu_title": "sidebar.cardsMasonry"
            },
            {
               "path": "/app/ui-components/chip",
               "new_item": false,
               "menu_title": "sidebar.chip"
            },
            {
               "path": "/app/ui-components/dialog",
               "new_item": false,
               "menu_title": "sidebar.dialog"
            },
            {
               "path": "/app/ui-components/dividers",
               "new_item": false,
               "menu_title": "sidebar.dividers"
            },
            {
               "path": "/app/ui-components/drawers",
               "new_item": false,
               "menu_title": "sidebar.drawers"
            },
            {
               "path": "/app/ui-components/expansion-panel",
               "new_item": false,
               "menu_title": "sidebar.expansionPanel"
            },
            {
               "path": "/app/ui-components/grid-list",
               "new_item": false,
               "menu_title": "sidebar.gridList"
            },
            {
               "path": "/app/ui-components/list",
               "new_item": false,
               "menu_title": "sidebar.list"
            },
            {
               "path": "/app/ui-components/menu",
               "new_item": false,
               "menu_title": "sidebar.menu"
            },
            {
               "path": "/app/ui-components/popover",
               "new_item": false,
               "menu_title": "sidebar.popoverAndToolTip"
            },
            {
               "path": "/app/ui-components/progress",
               "new_item": false,
               "menu_title": "sidebar.progress"
            },
            {
               "path": "/app/ui-components/snackbar",
               "new_item": false,
               "menu_title": "sidebar.snackbar"
            },
            {
               "path": "/app/ui-components/selection-controls",
               "new_item": false,
               "menu_title": "sidebar.selectionControls"
            }
         ]
      },
      {
         "menu_title": "sidebar.advancedComponent",
         "menu_icon": "zmdi zmdi-view-carousel",
         "type_multi": null,
         "new_item": false,
         "child_routes": [
            {
               "path": "/app/advanced-component/dateTime-picker",
               "new_item": false,
               "menu_title": "sidebar.dateAndTimePicker"
            },
            {
               "path": "/app/advanced-component/tabs",
               "new_item": false,
               "menu_title": "sidebar.tabs"
            },
            {
               "path": "/app/advanced-component/stepper",
               "new_item": false,
               "menu_title": "sidebar.stepper"
            },
            {
               "path": "/app/advanced-component/notification",
               "new_item": false,
               "menu_title": "sidebar.notification"
            },
            {
               "path": "/app/advanced-component/sweet-alert",
               "new_item": false,
               "menu_title": "sidebar.sweetAlert"
            },
            {
               "path": "/app/advanced-component/auto-complete",
               "new_item": false,
               "menu_title": "sidebar.autoComplete"
            }
         ]
      },
      {
         "menu_title": "sidebar.aboutUs",
         "menu_icon": "zmdi zmdi-info",
         "path": "/app/about-us",
         "new_item": false,
         "child_routes": null
      }
   ],
   category4: [
      {
         "menu_title": "sidebar.forms",
         "menu_icon": "zmdi zmdi-file-text",
         "type_multi": null,
         "new_item": false,
         "child_routes": [
            {
               "path": "/app/forms/form-elements",
               "new_item": false,
               "menu_title": "sidebar.formElements"
            },
            {
               "path": "/app/forms/text-field",
               "new_item": false,
               "menu_title": "sidebar.textField"
            },
            {
               "path": "/app/forms/select-list",
               "new_item": false,
               "menu_title": "sidebar.selectList"
            }
         ]
      },
      {
         "menu_title": "sidebar.charts",
         "menu_icon": "zmdi zmdi-chart-donut",
         "type_multi": null,
         "new_item": false,
         "child_routes": [
            {
               "path": "/app/charts/re-charts",
               "new_item": false,
               "menu_title": "sidebar.reCharts"
            },
            {
               "path": "/app/charts/react-chartjs2",
               "new_item": false,
               "menu_title": "sidebar.reactChartjs2"
            }
         ]
      },
      {
         "menu_title": "sidebar.icons",
         "menu_icon": "zmdi zmdi-star",
         "type_multi": null,
         "new_item": false,
         "child_routes": [
            {
               "path": "/app/icons/themify-icons",
               "new_item": false,
               "menu_title": "sidebar.themifyIcons"
            },
            {
               "path": "/app/icons/simple-lineIcons",
               "new_item": false,
               "menu_title": "sidebar.simpleLineIcons"
            },
            {
               "path": "/app/icons/material-icons",
               "new_item": false,
               "menu_title": "sidebar.materialIcons"
            }
         ]
      },
      {
         "menu_title": "sidebar.tables",
         "menu_icon": "zmdi zmdi-grid",
         "type_multi": null,
         "new_item": false,
         "child_routes": [
            {
               "path": "/app/tables/basic",
               "new_item": false,
               "menu_title": "sidebar.basic"
            },
            {
               "path": "/app/tables/data-table",
               "new_item": false,
               "menu_title": "sidebar.dataTable"
            },
            {
               "path": "/app/tables/responsive",
               "new_item": false,
               "menu_title": "sidebar.responsive"
            }
         ]
      }
   ],
   category5: [
      {
         "menu_title": "sidebar.maps",
         "menu_icon": "zmdi zmdi-map",
         "type_multi": null,
         "new_item": false,
         "child_routes": [
            {
               "path": "/app/maps/google-maps",
               "new_item": false,
               "menu_title": "sidebar.googleMaps"
            },
            {
               "path": "/app/maps/leaflet-maps",
               "new_item": false,
               "menu_title": "sidebar.leafletMaps"
            }
         ]
      },
      {
         "menu_title": "sidebar.users",
         "menu_icon": "zmdi zmdi-accounts",
         "type_multi": null,
         "new_item": false,
         "child_routes": [
            {
               "path": "/app/users/user-profile-1",
               "new_item": false,
               "menu_title": "sidebar.userProfile1"
            },
            {
               "path": "/app/users/user-profile",
               "new_item": false,
               "menu_title": "sidebar.userProfile2"
            },
            {
               "path": "/app/users/user-management",
               "new_item": false,
               "menu_title": "sidebar.userManagement"
            },
            {
               "path": "/app/users/user-list",
               "new_item": false,
               "menu_title": "sidebar.userList"
            }
         ]
      },
      {
         "menu_title": "sidebar.calendar",
         "menu_icon": "zmdi zmdi-calendar-note",
         "type_multi": null,
         "new_item": false,
         "child_routes": [
            {
               "path": "/app/calendar/basic",
               "new_item": false,
               "menu_title": "components.basic"
            },
            {
               "path": "/app/calendar/cultures",
               "new_item": false,
               "menu_title": "sidebar.cultures"
            },
            {
               "path": "/app/calendar/selectable",
               "new_item": false,
               "menu_title": "sidebar.selectable"
            },
            {
               "path": "/app/calendar/custom-rendering",
               "new_item": false,
               "menu_title": "sidebar.customRendering"
            }
         ]
      },
      {
         "menu_title": "sidebar.editor",
         "menu_icon": "zmdi zmdi-edit",
         "type_multi": null,
         "new_item": false,
         "child_routes": [
            {
               "path": "/app/editor/wysiwyg-editor",
               "new_item": false,
               "menu_title": "sidebar.wysiwygEditor"
            },
            {
               "path": "/app/editor/quill-editor",
               "new_item": false,
               "menu_title": "sidebar.quillEditor"
            }
         ]
      },
      {
         "menu_title": "sidebar.dragAndDrop",
         "menu_icon": "zmdi zmdi-mouse",
         "type_multi": null,
         "new_item": false,
         "child_routes": [
            {
               "path": "/app/drag-andDrop/react-dragula",
               "new_item": false,
               "menu_title": "sidebar.reactDragula"
            },
            {
               "path": "/app/drag-andDrop/react-dnd",
               "new_item": false,
               "menu_title": "sidebar.reactDnd"
            }
         ]
      },
      {
         "menu_title": "sidebar.multiLevel",
         "menu_icon": "zmdi zmdi-view-web",
         "type_multi": true,
         "new_item": false,
         "child_routes": [
            {
               "menu_title": "sidebar.level1",
               "child_routes": [
                  {
                     "path": "/app/level2",
                     "menu_title": "sidebar.level2"
                  }
               ]
            }
         ]
      },
   ],
   category6: [
      {
         "menu_title": "sidebar.imageCropper",
         "menu_icon": "zmdi zmdi-crop",
         "path": "/app/image-cropper",
         "new_item": false,
         "child_routes": null

      },
      {
         "menu_title": "sidebar.videoPlayer",
         "menu_icon": "zmdi zmdi-collection-video",
         "path": "/app/video-player",
         "new_item": false,
         "child_routes": null
      },
      {
         "menu_title": "sidebar.dropzone",
         "menu_icon": "zmdi zmdi-dropbox",
         "path": "/app/dropzone",
         "new_item": false,
         "child_routes": null
      }
   ]
}
