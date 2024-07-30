import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import {router} from './router.js'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { 
    faStar as fasStar,
    faPlay,
    faPlus,
    faCheck,
    faInfo
} from '@fortawesome/free-solid-svg-icons'

import {
    faStar as farStar,
    faThumbsUp
} from '@fortawesome/free-regular-svg-icons'


/* add icons to the library */
library
.add(farStar, fasStar, faPlay, faPlus, faThumbsUp, faCheck, faInfo)

createApp(App)
.use(router)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')

