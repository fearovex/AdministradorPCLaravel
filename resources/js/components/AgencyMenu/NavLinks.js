// Agency nav links
export default {
   category1: [
      {
         "menu_title": "sidebar.dashboard",
         "menu_icon": "zmdi zmdi-view-dashboard",
         "new_item": true,
         "child_routes": [
            {
               "path": "/app/dashboard/ecommerce",
               "menu_title": "sidebar.ecommerce",
               "new_item": false,
               exact: true
            },
            {
               "path": "/dashboard/crm/dashboard",
               "new_item": true,
               "menu_title": "sidebar.crm",
               exact: true
            },
            {
               "path": "/horizontal/dashboard/saas",
               "menu_title": "sidebar.saas",
               "new_item": false,
               exact: true
            },
            {
               "path": "/agency/dashboard/agency",
               "menu_title": "sidebar.agency",
               "new_item": false,
               exact: true
            },
            {
               "path": "/boxed/dashboard/news",
               "menu_title": "sidebar.news",
               "new_item": false,
               exact: true
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
               "menu_title": "sidebar.projects",
               exact: true
            },
            {
               "path": "/dashboard/crm/clients",
               "new_item": true,
               "menu_title": "sidebar.clients",
               exact: true
            },
            {
               "path": "/dashboard/crm/reports",
               "new_item": true,
               "menu_title": "sidebar.reports",
               exact: true
            }
         ]
      },
      {
         "menu_title": "sidebar.ecommerce",
         "menu_icon": "zmdi zmdi-shopping-cart",
         "new_item": false,
         "child_routes": [
            {
               "path": "/ecommerce/shop",
               "new_item": false,
               "menu_title": "sidebar.shop"
            },
            {
               "path": "/ecommerce/cart",
               "new_item": false,
               "menu_title": "sidebar.cart"
            },
            {
               "path": "/ecommerce/checkout",
               "new_item": false,
               "menu_title": "sidebar.checkout"
            },
            {
               "path": "/ecommerce/shop-list",
               "new_item": false,
               "menu_title": "sidebar.shopList"
            },
            {
               "path": "/ecommerce/shop-grid",
               "new_item": false,
               "menu_title": "sidebar.shopGrid"
            },
            {
               "path": "/ecommerce/invoice",
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
               "path": "/widgets/charts",
               "new_item": false,
               "menu_title": "sidebar.charts"
            },
            {
               "path": "/widgets/promo",
               "new_item": false,
               "menu_title": "sidebar.promo"
            },
            {
               "path": "/widgets/general",
               "new_item": false,
               "menu_title": "sidebar.general"
            },
            {
               "path": "/widgets/user",
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
               "path": "/pages/gallery",
               "new_item": false,
               "menu_title": "sidebar.gallery"
            },
            {
               "path": "/pages/pricing",
               "new_item": false,
               "menu_title": "sidebar.pricing"
            },
            {
               "path": "/pages/blank",
               "new_item": false,
               "menu_title": "sidebar.blank"
            },
            {
               "path": "/terms-condition",
               "new_item": false,
               "menu_title": "sidebar.terms&Conditions"
            },
            {
               "path": "/pages/feedback",
               "new_item": false,
               "menu_title": "sidebar.feedback"
            },
            {
               "path": "/pages/report",
               "new_item": false,
               "menu_title": "sidebar.report"
            },
            {
               "path": "/pages/faq",
               "new_item": false,
               "menu_title": "sidebar.faq(s)"
            }
         ]
      },
      {
         "menu_title": "sidebar.session",
         "menu_icon": "zmdi zmdi-time",
         "new_item": false,
         "child_routes": [
            {
               "path": "/session/login",
               "new_item": false,
               "menu_title": "sidebar.login",
               exact: true
            },
            {
               "path": "/session/register",
               "new_item": false,
               "menu_title": "sidebar.register",
               exact: true
            },
            {
               "path": "/session/lock-screen",
               "new_item": false,
               "menu_title": "sidebar.lockScreen",
               exact: true
            },
            {
               "path": "/session/forgot-password",
               "new_item": false,
               "menu_title": "sidebar.forgotPassword",
               exact: true
            },
            {
               "path": "/session/404",
               "new_item": false,
               "menu_title": "sidebar.404",
               exact: true
            },
            {
               "path": "/session/500",
               "new_item": false,
               "menu_title": "sidebar.500",
               exact: true
            }
         ]
      }
   ],
   category2: [
      {
         "menu_title": "sidebar.inbox",
         "menu_icon": "zmdi zmdi-email",
         "path": "/mail",
         "new_item": false,
         "child_routes": null
      },
      {
         "menu_title": "sidebar.chat",
         "menu_icon": "zmdi zmdi-comments",
         "path": "/chat",
         "new_item": false,
         "child_routes": null
      },
      {
         "menu_title": "sidebar.toDo",
         "menu_icon": "zmdi zmdi-comment-text-alt",
         "path": "/todo",
         "new_item": false,
         "child_routes": null
      }
   ],
   category3: [
      {
         "menu_title": "sidebar.uiComponents",
         "menu_icon": "zmdi zmdi-wrench",
         "new_item": false,
         "child_routes": [
            {
               "path": "/ui-components/alerts",
               "new_item": false,
               "menu_title": "sidebar.alerts"
            },
            {
               "path": "/ui-components/app-bar",
               "new_item": false,
               "menu_title": "sidebar.appBar"
            },
            {
               "path": "/ui-components/avatars",
               "new_item": false,
               "menu_title": "sidebar.avatars"
            },
            {
               "path": "/ui-components/buttons",
               "new_item": false,
               "menu_title": "sidebar.buttons"
            },
            {
               "path": "/ui-components/bottom-navigations",
               "new_item": false,
               "menu_title": "sidebar.bottomNavigations"
            },
            {
               "path": "/ui-components/badges",
               "new_item": false,
               "menu_title": "sidebar.badges"
            },
            {
               "path": "/ui-components/cards",
               "new_item": false,
               "menu_title": "sidebar.cards"
            },
            {
               "path": "/ui-components/cards-masonry",
               "new_item": false,
               "menu_title": "sidebar.cardsMasonry"
            },
            {
               "path": "/ui-components/chip",
               "new_item": false,
               "menu_title": "sidebar.chip"
            },
            {
               "path": "/ui-components/dialog",
               "new_item": false,
               "menu_title": "sidebar.dialog"
            },
            {
               "path": "/ui-components/dividers",
               "new_item": false,
               "menu_title": "sidebar.dividers"
            },
            {
               "path": "/ui-components/drawers",
               "new_item": false,
               "menu_title": "sidebar.drawers"
            },
            {
               "path": "/ui-components/expansion-panel",
               "new_item": false,
               "menu_title": "sidebar.expansionPanel"
            },
            {
               "path": "/ui-components/grid-list",
               "new_item": false,
               "menu_title": "sidebar.gridList"
            },
            {
               "path": "/ui-components/list",
               "new_item": false,
               "menu_title": "sidebar.list"
            },
            {
               "path": "/ui-components/menu",
               "new_item": false,
               "menu_title": "sidebar.menu"
            },
            {
               "path": "/ui-components/popover",
               "new_item": false,
               "menu_title": "sidebar.popoverAndToolTip"
            },
            {
               "path": "/ui-components/progress",
               "new_item": false,
               "menu_title": "sidebar.progress"
            },
            {
               "path": "/ui-components/snackbar",
               "new_item": false,
               "menu_title": "sidebar.snackbar"
            },
            {
               "path": "/ui-components/selection-controls",
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
               "path": "/advanced-component/dateTime-picker",
               "new_item": false,
               "menu_title": "sidebar.dateAndTimePicker"
            },
            {
               "path": "/advanced-component/tabs",
               "new_item": false,
               "menu_title": "sidebar.tabs"
            },
            {
               "path": "/advanced-component/stepper",
               "new_item": false,
               "menu_title": "sidebar.stepper"
            },
            {
               "path": "/advanced-component/notification",
               "new_item": false,
               "menu_title": "sidebar.notification"
            },
            {
               "path": "/advanced-component/sweet-alert",
               "new_item": false,
               "menu_title": "sidebar.sweetAlert"
            },
            {
               "path": "/advanced-component/auto-complete",
               "new_item": false,
               "menu_title": "sidebar.autoComplete"
            }
         ]
      },
      {
         "menu_title": "sidebar.aboutUs",
         "menu_icon": "zmdi zmdi-info",
         "path": "/about-us",
         "new_item": false,
         "child_routes": null
      }
   ],
   category4: [
      {
         "menu_title": "sidebar.forms",
         "menu_icon": "zmdi zmdi-file-text",
         "new_item": false,
         "child_routes": [
            {
               "path": "/forms/form-elements",
               "new_item": false,
               "menu_title": "sidebar.formElements"
            },
            {
               "path": "/forms/text-field",
               "new_item": false,
               "menu_title": "sidebar.textField"
            },
            {
               "path": "/forms/select-list",
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
               "path": "/charts/re-charts",
               "new_item": false,
               "menu_title": "sidebar.reCharts"
            },
            {
               "path": "/charts/react-chartjs2",
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
               "path": "/icons/themify-icons",
               "new_item": false,
               "menu_title": "sidebar.themifyIcons"
            },
            {
               "path": "/icons/simple-lineIcons",
               "new_item": false,
               "menu_title": "sidebar.simpleLineIcons"
            },
            {
               "path": "/icons/material-icons",
               "new_item": false,
               "menu_title": "sidebar.materialIcons"
            }
         ]
      },
      {
         "menu_title": "sidebar.tables",
         "menu_icon": "zmdi zmdi-grid",
         "new_item": false,
         "child_routes": [
            {
               "path": "/tables/basic",
               "new_item": false,
               "menu_title": "sidebar.basic"
            },
            {
               "path": "/tables/data-table",
               "new_item": false,
               "menu_title": "sidebar.dataTable"
            },
            {
               "path": "/tables/responsive",
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
         "new_item": false,
         "child_routes": [
            {
               "path": "/maps/google-maps",
               "new_item": false,
               "menu_title": "sidebar.googleMaps"
            },
            {
               "path": "/maps/leaflet-maps",
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
               "path": "/users/user-profile-1",
               "new_item": false,
               "menu_title": "sidebar.userProfile1"
            },
            {
               "path": "/users/user-profile",
               "new_item": false,
               "menu_title": "sidebar.userProfile2"
            },
            {
               "path": "/users/user-management",
               "new_item": false,
               "menu_title": "sidebar.userManagement"
            },
            {
               "path": "/users/user-list", "new_item": false,
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
               "path": "/calendar/basic",
               "new_item": false,
               "menu_title": "components.basic"
            },
            {
               "path": "/calendar/cultures",
               "new_item": false,
               "menu_title": "sidebar.cultures"
            },
            {
               "path": "/calendar/selectable",
               "new_item": false,
               "menu_title": "sidebar.selectable"
            },
            {
               "path": "/calendar/custom-rendering",
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
               "path": "/editor/wysiwyg-editor",
               "new_item": false,
               "menu_title": "sidebar.wysiwygEditor"
            },
            {
               "path": "/editor/quill-editor",
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
               "path": "/drag-andDrop/react-dragula",
               "new_item": false,
               "menu_title": "sidebar.reactDragula"
            },
            {
               "path": "/drag-andDrop/react-dnd",
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
                     "path": "/level2",
                     "menu_title": "sidebar.level2"
                  },
                  {
                     "path": "/level2",
                     "menu_title": "sidebar.level2"
                  },
                  {
                     "path": "/level2",
                     "menu_title": "sidebar.level2"
                  }
               ]
            },
            {
               "menu_title": "sidebar.level1",
               "child_routes": [
                  {
                     "path": "/level2",
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
         "path": "/image-cropper",
         "new_item": false,
         "child_routes": null
      },
      {
         "menu_title": "sidebar.videoPlayer",
         "menu_icon": "zmdi zmdi-collection-video",
         "path": "/video-player",
         "new_item": false,
         "child_routes": null
      },
      {
         "menu_title": "sidebar.dropzone",
         "menu_icon": "zmdi zmdi-dropbox",
         "path": "/dropzone",
         "new_item": false,
         "child_routes": null
      }
   ]
}
