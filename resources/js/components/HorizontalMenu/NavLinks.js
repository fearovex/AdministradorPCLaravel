// horizontal nav links
export default {
   category1: [
      {
         "menu_title": "sidebar.dashboard",
         "menu_icon": "zmdi zmdi-view-dashboard",
         "new_item": true,
         "child_routes": [
            {
               "path": "/app/dashboard/ecommerce",
               "new_item": false,
               "menu_title": "sidebar.ecommerce",
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
            }
         ]
      },
      {
         "menu_title": "sidebar.crm",
         "menu_icon": "zmdi zmdi-book",
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
         "new_item": false,
         "menu_icon": "zmdi zmdi-shopping-cart",
         "child_routes": [
            {
               "path": "/horizontal/ecommerce/shop",
               "new_item": false,
               "menu_title": "sidebar.shop"
            },
            {
               "path": "/horizontal/ecommerce/cart",
               "new_item": false,
               "menu_title": "sidebar.cart"
            },
            {
               "path": "/horizontal/ecommerce/checkout",
               "new_item": false,
               "menu_title": "sidebar.checkout"
            },
            {
               "path": "/horizontal/ecommerce/shop-list",
               "new_item": false,
               "menu_title": "sidebar.shopList"
            },
            {
               "path": "/horizontal/ecommerce/shop-grid",
               "new_item": false,
               "menu_title": "sidebar.shopGrid"
            },
            {
               "path": "/horizontal/ecommerce/invoice",
               "new_item": false,
               "menu_title": "sidebar.invoice"
            }
         ]
      },
      {
         "menu_title": "sidebar.widgets",
         "new_item": false,
         "menu_icon": "zmdi zmdi-widgets",
         "child_routes": [
            {
               "path": "/horizontal/widgets/charts",
               "new_item": false,
               "menu_title": "sidebar.charts"
            },
            {
               "path": "/horizontal/widgets/promo",
               "new_item": false,
               "menu_title": "sidebar.promo"
            },
            {
               "path": "/horizontal/widgets/general",
               "new_item": false,
               "menu_title": "sidebar.general"
            },
            {
               "path": "/horizontal/widgets/user",
               "new_item": false,
               "menu_title": "sidebar.user"
            },
         ]
      },
      {
         "menu_title": "sidebar.pages",
         "new_item": false,
         "menu_icon": "zmdi zmdi-file-plus",
         "child_routes": [
            {
               "path": "/horizontal/pages/gallery",
               "new_item": false,
               "menu_title": "sidebar.gallery"
            },
            {
               "path": "/horizontal/pages/pricing",
               "new_item": false,
               "menu_title": "sidebar.pricing"
            },
            {
               "path": "/horizontal/pages/blank",
               "new_item": false,
               "menu_title": "sidebar.blank"
            },
            {
               "path": "/terms-condition",
               "new_item": false,
               "menu_title": "sidebar.terms&Conditions"
            },
            {
               "path": "/horizontal/pages/feedback",
               "new_item": false,
               "menu_title": "sidebar.feedback"
            },
            {
               "path": "/horizontal/pages/report",
               "new_item": false,
               "menu_title": "sidebar.report"
            },
            {
               "path": "/horizontal/pages/faq",
               "new_item": false,
               "menu_title": "sidebar.faq(s)"
            }
         ]
      },
      {
         "menu_title": "sidebar.session",
         "new_item": false,
         "menu_icon": "zmdi zmdi-time",
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
         "path": "/horizontal/mail",
         "new_item": false,
         "child_routes": null
      },
      {
         "menu_title": "sidebar.chat",
         "menu_icon": "zmdi zmdi-comments",
         "path": "/horizontal/chat",
         "new_item": false,
         "child_routes": null
      },
      {
         "menu_title": "sidebar.toDo",
         "menu_icon": "zmdi zmdi-comment-text-alt",
         "path": "/horizontal/todo",
         "new_item": false,
         "child_routes": null
      }
   ],
   category3: [
      {
         "menu_title": "sidebar.uiComponents",
         "new_item": false,
         "menu_icon": "zmdi zmdi-wrench",
         "child_routes": [
            {
               "path": "/horizontal/ui-components/alerts",
               "new_item": false,
               "menu_title": "sidebar.alerts"
            },
            {
               "path": "/horizontal/ui-components/app-bar",
               "new_item": false,
               "menu_title": "sidebar.appBar"
            },
            {
               "path": "/horizontal/ui-components/avatars",
               "new_item": false,
               "menu_title": "sidebar.avatars"
            },
            {
               "path": "/horizontal/ui-components/buttons",
               "new_item": false,
               "menu_title": "sidebar.buttons"
            },
            {
               "path": "/horizontal/ui-components/bottom-navigations",
               "new_item": false,
               "menu_title": "sidebar.bottomNavigations"
            },
            {
               "path": "/horizontal/ui-components/badges",
               "new_item": false,
               "menu_title": "sidebar.badges"
            },
            {
               "path": "/horizontal/ui-components/cards",
               "new_item": false,
               "menu_title": "sidebar.cards"
            },
            {
               "path": "/horizontal/ui-components/cards-masonry",
               "new_item": false,
               "menu_title": "sidebar.cardsMasonry"
            },
            {
               "path": "/horizontal/ui-components/chip",
               "new_item": false,
               "menu_title": "sidebar.chip"
            },
            {
               "path": "/horizontal/ui-components/dialog",
               "new_item": false,
               "menu_title": "sidebar.dialog"
            },
            {
               "path": "/horizontal/ui-components/dividers",
               "new_item": false,
               "menu_title": "sidebar.dividers"
            },
            {
               "path": "/horizontal/ui-components/drawers",
               "new_item": false,
               "menu_title": "sidebar.drawers"
            },
            {
               "path": "/horizontal/ui-components/expansion-panel",
               "new_item": false,
               "menu_title": "sidebar.expansionPanel"
            },
            {
               "path": "/horizontal/ui-components/grid-list",
               "new_item": false,
               "menu_title": "sidebar.gridList"
            },
            {
               "path": "/horizontal/ui-components/list",
               "new_item": false,
               "menu_title": "sidebar.list"
            },
            {
               "path": "/horizontal/ui-components/menu",
               "new_item": false,
               "menu_title": "sidebar.menu"
            },
            {
               "path": "/horizontal/ui-components/popover",
               "new_item": false,
               "menu_title": "sidebar.popoverAndToolTip"
            },
            {
               "path": "/horizontal/ui-components/progress",
               "new_item": false,
               "menu_title": "sidebar.progress"
            },
            {
               "path": "/horizontal/ui-components/snackbar",
               "new_item": false,
               "menu_title": "sidebar.snackbar"
            },
            {
               "path": "/horizontal/ui-components/selection-controls",
               "new_item": false,
               "menu_title": "sidebar.selectionControls"
            }
         ]
      },
      {
         "menu_title": "sidebar.advancedComponent",
         "new_item": false,
         "menu_icon": "zmdi zmdi-view-carousel",
         "child_routes": [
            {
               "path": "/horizontal/advanced-component/dateTime-picker",
               "new_item": false,
               "menu_title": "sidebar.dateAndTimePicker"
            },
            {
               "path": "/horizontal/advanced-component/tabs",
               "new_item": false,
               "menu_title": "sidebar.tabs"
            },
            {
               "path": "/horizontal/advanced-component/stepper",
               "new_item": false,
               "menu_title": "sidebar.stepper"
            },
            {
               "path": "/horizontal/advanced-component/notification",
               "new_item": false,
               "menu_title": "sidebar.notification"
            },
            {
               "path": "/horizontal/advanced-component/sweet-alert",
               "new_item": false,
               "menu_title": "sidebar.sweetAlert"
            },
            {
               "path": "/horizontal/advanced-component/auto-complete",
               "new_item": false,
               "menu_title": "sidebar.autoComplete"
            }
         ]
      },
      {
         "menu_title": "sidebar.aboutUs",
         "menu_icon": "zmdi zmdi-info",
         "path": "/horizontal/about-us",
         "new_item": false,
         "child_routes": null
      }
   ],
   category4: [
      {
         "menu_title": "sidebar.forms",
         "new_item": false,
         "menu_icon": "zmdi zmdi-file-text",
         "child_routes": [
            {
               "path": "/horizontal/forms/form-elements",
               "new_item": false,
               "menu_title": "sidebar.formElements"
            },
            {
               "path": "/horizontal/forms/text-field",
               "new_item": false,
               "menu_title": "sidebar.textField"
            },
            {
               "path": "/horizontal/forms/select-list",
               "new_item": false,
               "menu_title": "sidebar.selectList"
            }
         ]
      },
      {
         "menu_title": "sidebar.charts",
         "new_item": false,
         "menu_icon": "zmdi zmdi-chart-donut",
         "child_routes": [
            {
               "path": "/horizontal/charts/re-charts",
               "new_item": false,
               "menu_title": "sidebar.reCharts"
            },
            {
               "path": "/horizontal/charts/react-chartjs2",
               "new_item": false,
               "menu_title": "sidebar.reactChartjs2"
            }
         ]
      },
      {
         "menu_title": "sidebar.icons",
         "new_item": false,
         "menu_icon": "zmdi zmdi-flag",
         "child_routes": [
            {
               "path": "/horizontal/icons/themify-icons",
               "new_item": false,
               "menu_title": "sidebar.themifyIcons"
            },
            {
               "path": "/horizontal/icons/simple-lineIcons",
               "new_item": false,
               "menu_title": "sidebar.simpleLineIcons"
            },
            {
               "path": "/horizontal/icons/material-icons",
               "new_item": false,
               "menu_title": "sidebar.materialIcons"
            }
         ]
      },
      {
         "menu_title": "sidebar.tables",
         "new_item": false,
         "menu_icon": "zmdi zmdi-grid",
         "child_routes": [
            {
               "path": "/horizontal/tables/basic",
               "new_item": false,
               "menu_title": "sidebar.basic"
            },
            {
               "path": "/horizontal/tables/data-table",
               "new_item": false,
               "menu_title": "sidebar.dataTable"
            },
            {
               "path": "/horizontal/tables/responsive",
               "new_item": false,
               "menu_title": "sidebar.responsive"
            }
         ]
      }
   ],
   category5: [
      {
         "menu_title": "sidebar.maps",
         "new_item": false,
         "menu_icon": "zmdi zmdi-map",
         "child_routes": [
            {
               "path": "/horizontal/maps/google-maps",
               "new_item": false,
               "menu_title": "sidebar.googleMaps"
            },
            {
               "path": "/horizontal/maps/leaflet-maps",
               "new_item": false,
               "menu_title": "sidebar.leafletMaps"
            }
         ]
      },
      {
         "menu_title": "sidebar.users",
         "new_item": false,
         "menu_icon": "zmdi zmdi-accounts",
         "child_routes": [
            {
               "path": "/horizontal/users/user-profile-1",
               "new_item": false,
               "menu_title": "sidebar.userProfile1"
            },
            {
               "path": "/horizontal/users/user-profile",
               "new_item": false,
               "menu_title": "sidebar.userProfile2"
            },
            {
               "path": "/horizontal/users/user-management",
               "new_item": false,
               "menu_title": "sidebar.userManagement"
            },
            {
               "path": "/horizontal/users/user-list",
               "new_item": false,
               "menu_title": "sidebar.userList"
            }
         ]
      },
      {
         "menu_title": "sidebar.calendar",
         "new_item": false,
         "menu_icon": "zmdi zmdi-calendar-note",
         "child_routes": [
            {
               "path": "/horizontal/calendar/basic",
               "new_item": false,
               "menu_title": "components.basic"
            },
            {
               "path": "/horizontal/calendar/cultures",
               "new_item": false,
               "menu_title": "sidebar.cultures"
            },
            {
               "path": "/horizontal/calendar/selectable",
               "new_item": false,
               "menu_title": "sidebar.selectable"
            },
            {
               "path": "/horizontal/calendar/custom-rendering",
               "new_item": false,
               "menu_title": "sidebar.customRendering"
            }
         ]
      },
      {
         "menu_title": "sidebar.editor",
         "new_item": false,
         "menu_icon": "zmdi zmdi-edit",
         "child_routes": [
            {
               "path": "/horizontal/editor/wysiwyg-editor",
               "new_item": false,
               "menu_title": "sidebar.wysiwygEditor"
            },
            {
               "path": "/horizontal/editor/quill-editor",
               "new_item": false,
               "menu_title": "sidebar.quillEditor"
            }
         ]
      },
      {
         "menu_title": "sidebar.dragAndDrop",
         "new_item": false,
         "menu_icon": "zmdi zmdi-mouse",
         "child_routes": [
            {
               "path": "/horizontal/drag-andDrop/react-dragula",
               "new_item": false,
               "menu_title": "sidebar.reactDragula"
            },
            {
               "path": "/horizontal/drag-andDrop/react-dnd",
               "new_item": false,
               "menu_title": "sidebar.reactDnd"
            }
         ]
      },
      {
         "menu_title": "sidebar.multiLevel",
         "new_item": false,
         "menu_icon": "zmdi zmdi-view-web",
         "child_routes": [
            {
               "menu_title": "sidebar.level1",
               "child_routes": [
                  {
                     "path": "/horizontal/level2",
                     "menu_title": "sidebar.level2"
                  },
                  {
                     "path": "/horizontal/level2",
                     "menu_title": "sidebar.level2"
                  },
                  {
                     "path": "/horizontal/level2",
                     "menu_title": "sidebar.level2"
                  }
               ]
            },
            {
               "menu_title": "sidebar.level1",
               "child_routes": [
                  {
                     "path": "/horizontal/level2",
                     "menu_title": "sidebar.level2"
                  }
               ]
            }
         ]
      }
   ],
   category6: [
      {
         "menu_title": "sidebar.imageCropper",
         "menu_icon": "zmdi zmdi-crop",
         "path": "/horizontal/image-cropper",
         "new_item": false,
         "child_routes": null
      },
      {
         "menu_title": "sidebar.videoPlayer",
         "menu_icon": "zmdi zmdi-collection-video",
         "path": "/horizontal/video-player",
         "new_item": false,
         "child_routes": null
      },
      {
         "menu_title": "sidebar.dropzone",
         "menu_icon": "zmdi zmdi-dropbox",
         "path": "/horizontal/dropzone",
         "new_item": false,
         "child_routes": null
      }
   ]
}
