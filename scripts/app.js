var navSearch = Vue.component('nav-search', {
  data: function () {
    return {
      search: '',
      condition: 'name',
      includeWinbond: false
    }
  },
  template: `
    <nav class="navbar navbar-dark bg-light justify-content-center border-bottom shadow-sm">
      <a class="navbar-brand" href="#">
        <h4 class="text-dark mb-0">Address Book</h4>
        <!-- <img src="./images/logo.png" width="133" height="20" alt=""> -->
      </a>
      <form>
        <div class="input-group my-2">
          <input type="text" class="form-control" placeholder="請輸入搜尋內容" aria-label="請輸入搜尋內容" aria-describedby="button-addon" v-model="search" @focus="doSearch">
          <div class="input-group-append">
            <button class="btn btn-secondary" type="button" id="button-addon" @click="searchResults(search, condition, includeWinbond)"><i class="fas fa-search"></i></button>
          </div>
        </div>
        <div class="form-group mb-0">
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="searchRadioOptions" id="searchRadio1" value="name" v-model="condition" @click="searchResults(search, 'name', includeWinbond)">
            <label class="form-check-label" for="searchRadio1">姓名</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="searchRadioOptions" id="searchRadio2" value="dept" v-model="condition" @click="searchResults(search, 'dept', includeWinbond)">
            <label class="form-check-label" for="searchRadio2">部門</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="searchRadioOptions" id="searchRadio3" value="alias" v-model="condition" @click="searchResults(search, 'alias', includeWinbond)">
            <label class="form-check-label" for="searchRadio3">Alias</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="searchRadioOptions" id="searchRadio4" value="phone" v-model="condition" @click="searchResults(search, 'phone', includeWinbond)">
            <label class="form-check-label" for="searchRadio4">電話</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="searchCheckbox" v-model="includeWinbond" @click="searchResults(search, condition, !includeWinbond)">
            <label class="form-check-label" for="searchCheckbox">是否包含Winbond</label>
          </div>
        </div>
      </form>
    </nav>
  `,
  methods: {
    doSearch: function (event) {
      if(app.homeContent != "search"){
        app.homeContent = 'historyPreview';
      }
    },
    searchResults: function(search, condition, includeWinbond) {
      if(!search) return;
      console.log(search, condition, includeWinbond);
      var contacts = app.contacts.filter(function(contact){
        search = search.trim().toLowerCase();
        return contact[condition].toLowerCase().indexOf(search) > -1;
      });
      app.results = contacts;
    }
  },
  watch: {
    // whenever question changes, this function will run
    search: function () {
      if(this.search.length > 0){
        app.homeContent = 'search';
      }else{
        app.homeContent = 'historyPreview';
      }
      this.searchResults(this.search, this.condition, this.includeWinbond);
    }
  }
})

var cardHistory = Vue.component('card-history', {
  props: ['contact'],
  template: `
    <div class="card mb-3" @click="$emit('click-home')">
      <div class="card-body p-3 d-flex justify-content-between">
        <div>
          <h5 class="card-title">{{ contact.name }}</h5>
          <p class="card-text">{{ contact.dept }} {{ contact.alias }}</p>
        </div>
        <div class="d-flex flex-column" v-if="contact.latest === 'ext'">
          <div class="d-flex ml-auto card-title">分機</div>
          <p class="card-text"><a :href="'tel:+' + contact.ext">{{ contact.ext }}</a></p>
        </div>
        <div class="d-flex flex-column" v-else-if="contact.latest === 'phone'">
          <div class="d-flex ml-auto card-title">行動電話</div>
          <p class="card-text"><a :href="'tel:+' + contact.phone">{{ contact.phone }}</a></p>
        </div>
        <div class="d-flex flex-column" v-else-if="contact.latest == 'mail'">
          <div class="d-flex ml-auto card-title">電子郵件<br/></div>
          <p class="card-text"><a :href="'mailto:+' + contact.mail">{{ contact.mail }}</a></p>
        </div>
      </div>
    </div>
  `
})

var cardHistoryPreview = Vue.component('card-history-preview', {
  props: ['contact'],
  template: `
    <div class="card mb-3">
      <div class="card-body p-3 d-flex justify-content-between">
        <div>
          <h5 class="card-title">{{ contact.name }}</h5>
          <p class="card-text">{{ contact.dept }} {{ contact.alias }}</p>
        </div>
        <div class="d-flex flex-column" v-if="contact.latest === 'ext'">
          <div class="d-flex ml-auto card-title">分機</div>
          <p class="card-text text-primary">{{ contact.ext }}</p>
        </div>
        <div class="d-flex flex-column" v-else-if="contact.latest === 'phone'">
          <div class="d-flex ml-auto card-title">行動電話</div>
          <p class="card-text text-primary">{{ contact.phone }}</p>
        </div>
        <div class="d-flex flex-column" v-else-if="contact.latest == 'mail'">
          <div class="d-flex ml-auto card-title">電子郵件<br/></div>
          <p class="card-text text-primary">{{ contact.mail }}</p>
        </div>
      </div>
    </div>
  `
})

var cardSearch = Vue.component('card-search', {
  props: ['contact'],
  template: `
    <div class="card mb-3" @click="$emit('click-home')">
      <div class="card-body p-3 d-flex justify-content-between">
        <div>
          <h5 class="card-title">{{ contact.name }}</h5>
          <p class="card-text">{{ contact.dept }} {{ contact.alias }}</p>
        </div>
        <div class="d-flex flex-column">
          <a :href="'tel:+' + contact.phone"><i class="fas fa-phone"></i> {{ contact.phone }}</a>
          <!-- <a class="btn" :href="'mailto:' + contact.mail"><i class="fas fa-envelope"></i>{{ contact.mail }}</a> -->
        </div>
      </div>
    </div>
  `
})

var cardContact = Vue.component('card-contact', {
  props: ['contact'],
  template: `
    <div class="card mb-3" @click="$emit('click-contact')">
      <div class="card-body p-3 d-flex justify-content-between">
        <div>
          <h5 class="card-title">{{ contact.name }}</h5>
          <p class="card-text">{{ contact.dept }} {{ contact.alias }}</p>
        </div>
      </div>
    </div>
  `
})

var cardDetail = Vue.component('card-detail', {
  props: ['contact', 'groups'],
  template: `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ contact.name }}</h5>
        <p class="card-text">{{ contact.dept }} {{ contact.alias }}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">分機<br/><a :href="'tel:+' + contact.ext">{{ contact.ext }}</a></li>
        <li class="list-group-item">行動電話<br/><a :href="'tel:+' + contact.phone">{{ contact.phone }}</a></li>
        <li class="list-group-item">電子郵件<br/><a :href="'mailto:' + contact.mail">{{ contact.mail }}</a></li>
      </ul>
      <div class="card-body d-flex justify-content-end">
        <div v-if="contact.saved && contact.group">
          <button class="btn btn-outline-success" @click="cancelSavedContact"><i class="fas fa-check"></i> 已儲存</button>
          <group-button :contact="contact" :groups="groups" :isGrouped="true"></group-button>
        </div>
        <div v-else-if="contact.saved && !contact.group">
          <button class="btn btn-outline-success" @click="cancelSavedContact"><i class="fas fa-check"></i> 已儲存</button>
          <group-button :contact="contact" :groups="groups" :isGrouped="false"></group-button>
        </div>
        <div v-else-if="!contact.saved && contact.group">
          <button class="btn btn-outline-secondary" @click="addSavedContact"><i class="fas fa-star"></i> 儲存</button>
          <group-button :contact="contact" :groups="groups" :isGrouped="true"></group-button>
        </div>
        <div v-else>
          <button class="btn btn-outline-secondary" @click="addSavedContact"><i class="fas fa-star"></i> 儲存</button>
          <group-button :contact="contact" :groups="groups" :isGrouped="false"></group-button>
        </div>
      </div>
    </div>
  `,
  methods: {
    addSavedContact: function() {
      this.contact.saved = true;
      console.log(this.contact);
    },
    cancelSavedContact: function() {
      this.contact.saved = false;
      console.log(this.contact);
    }
  }
})

var groupButton = Vue.component('group-button', {
  data: function () {
    return {
      newingGroup: false
    }
  },
  props: ['contact', 'groups', 'isGrouped'],
  template: `
    <div class="dropdown dropup d-inline-block ml-2">
      <button v-if="isGrouped" class="btn btn-outline-success dropdown-toggle" type="button" id="addGroupButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i class="fas fa-check"></i> {{ getGroupName(contact.group) }}
      </button>
      <button v-else class="btn btn-outline-secondary dropdown-toggle" type="button" id="addGroupButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i class="fas fa-users"></i> 群組
      </button>
      <div class="dropdown-menu dropdown-menu-right" aria-labelledby="addGroupButton">
        <a class="dropdown-item" href="#" v-for="group in groups" v-if="group.id != contact.group" :key="group.id" @click="addGroupContact(group.id)">{{ group.name }}</a>
        <div class="dropdown-divider" v-show="groups.length > 1 || (groups.length == 1 && groups[0].id != contact.group)"></div>
        <a class="dropdown-item" href="#" @click.stop="clickNewGroup">新增至</a>
        <form class="px-4 py-2" v-show="newingGroup">
          <div class="form-group">
            <input type="text" class="form-control" id="groupName" autocomplete="off" autofocus>
          </div>
          <button type="button" class="btn btn-sm btn-primary d-flex ml-auto" @click="newGroupContact()">確定</button>
        </form>
        <div class="dropdown-divider" v-show="isGrouped"></div>
        <a class="dropdown-item" href="#" v-show="isGrouped" @click="cancelGroupContact">從群組移除</a>
      </div>
    </div>
  `,
  methods: {
    getGroupName: function(groupId) {
      var group = app.groups.find(function(e){
        return e.id === groupId;
      })
      return group.name;
    },
    clickNewGroup: function() {
      console.log("clickNewGroup");
      let dropdown = document.querySelector(".dropdown-menu.dropdown-menu-right");
      let transform = dropdown.style.transform.split(',');
      let y = transform[1];
      y = parseInt(y.substring(0, y.indexOf("px"))) - 101;
      dropdown.style.transform = transform[0] + ", " + y + "px," + transform[2];
      this.newingGroup = true;
    },
    addGroupContact: function(groupId) {
      this.contact.group = groupId;
      console.log(groupId);
    },
    newGroupContact: function() {
      let groupName = document.getElementById("groupName").value;
      if(!groupName){
        alert("請輸入內容");
        return;
      }
      let newId = (this.groups.length > 0) ? this.groups[this.groups.length-1].id + 1 : 1;
      console.log("newGroupContact", newId, groupName);
      let newGroup = { id: newId, name: groupName };
      this.groups.push(newGroup);
      this.contact.group = newGroup.id;
      this.newingGroup = false;
      document.querySelector(".dropdown-menu.dropdown-menu-right").classList.remove("show");
    },
    cancelGroupContact: function(groupId) {
      this.contact.group = null;
      console.log(this.contact);
    }
  }
})

var app = new Vue({
  el: '#app',
  components: {
    'nav-search': navSearch,
    'card-history': cardHistory,
    'card-history-preview': cardHistoryPreview,
    'card-search': cardSearch,
    'card-contact': cardContact,
    'card-detail': cardDetail
  },
  data: {
    homeContentDefault: 'history',
    homeContent: 'history',
    savedContentDefault: 'saved',
    savedContent: 'saved',
    groupContentDefault: 'group',
    groupContent: 'group',
    editMode: false,
    contact: {},
    contacts: [
      { id: 1, uid: 1170187, name: '賴思元', alias: 'SYLAI', dept: 'D100', ext: '34313', phone: '0987-087870', mail: 'sylai@gmail.com', saved: true, group: 1, latest: 'ext', updateTime: '2018-09-05T09:10:58.440Z' },
      { id: 2, uid: 1178787, name: '張一三', alias: 'YSCHANG31', dept: 'A000', ext: '31313', phone: '0987-223451', mail: 'yschang31@yahoo.com', saved: true, group: 2, latest: 'phone', updateTime: '2018-09-04T09:10:58.440Z' },
      { id: 3, uid: 1172424, name: 'Rachel', alias: 'RGreen', dept: 'B000', ext: '32424', phone: '0987-337684', mail: 'rgreen@facebook.com', saved: true, group: null, latest: 'mail', updateTime: '2018-09-02T09:10:58.440Z' },
      { id: 4, uid: 1171238, name: 'Joey', alias: 'JTribbiani', dept: 'C000', ext: '37733', phone: '0987-351354', mail: 'jtribbiani@amazon.com', saved: false, group: null, latest: 'phone', updateTime: '2018-09-03T09:10:58.440Z' },
      { id: 5, uid: 1178234, name: 'Chandler', alias: 'CBing', dept: 'D000', ext: '37841', phone: '0987-456321', mail: 'cbing@apple.com', saved: false, group: null, latest: 'mail', updateTime: '2018-09-01T09:10:58.440Z' },
      { id: 6, uid: 1171234, name: 'Phoebe', alias: 'PBuffay', dept: 'E000', ext: '36453', phone: '0987-124354', mail: 'pbuffay@twitter.com', saved: false, group: null, latest: 'phone', updateTime: '2018-08-01T09:10:58.440Z' },
      { id: 7, uid: 1171341, name: 'Monica', alias: 'MGeller', dept: 'F000', ext: '34512', phone: '0987-324431', mail: 'mgeller@linkedin.com', saved: false, group: null, latest: 'ext', updateTime: '2018-08-02T09:10:58.440Z' },
      { id: 8, uid: 1179845, name: 'Ross', alias: 'RGeller', dept: 'G000', ext: '38745', phone: '0987-734523', mail: 'pgeller@netflix.com', saved: false, group: null, latest: 'ext', updateTime: '2018-08-03T09:10:58.440Z' }
    ],
    results: [],
    groups: [
      { id: 1, name: '我的群組一'},
      { id: 2, name: '我的群組二'}
    ]
  },
  computed: {
    historyContacts: function () {
      let history = this.contacts;
      history.sort(function(a, b){
        if(a.updateTime > b.updateTime){
          return -1;
        }
        if(a.updateTime < b.updateTime){
          return 1;
        }
        return 0;
      });
      return history.slice(0, 10);
    }
  },
  methods: {
    clickHomeHistoryPreview: function() {
      console.log(this.homeContent);
      this.homeContent = this.homeContentDefault;
    },
    clickHomeContact: function(contact) {
      console.log(contact);
      this.contact = contact;
      this.homeContent = 'detail';
    },
    clickSaveContact: function(contact) {
      console.log(contact);
      this.contact = contact;
      this.savedContent = 'detail';
    },
    clickGroupContact: function(contact) {
      console.log(contact);
      this.contact = contact;
      this.groupContent = 'detail';
    },
    resetContent: function() {
      this.$refs.searchInput.search = "";
      setTimeout(() => {
        this.homeContent = this.homeContentDefault;
        this.savedContent = this.savedContentDefault;
        this.groupContent = this.groupContentDefault;
        this.editMode = false;
      }, 200);
    },
    getContactsBySaved: function() {
      var contacts = this.contacts.filter(function(contact){
        return contact.saved;
      });
      return contacts;
    },
    getContactsByGroup: function(groupId) {
      var contacts = this.contacts.filter(function(contact){
        return contact.group === groupId;
      });
      return contacts;
    },
    deleteGroup: function(groupId) {
      var r = confirm("移除群組將連同聯絡資訊一併移除，是否繼續?");
      if (r) {
        this.groups = this.groups.filter(group => group.id != groupId);
        this.contacts = this.contacts.filter(function(contact){
          if(contact.group === groupId){
            contact.group = null;
          }
          return true;
        });
        this.editMode = false;
      }
    },
    editGroup: function(groupId) {
      var name = prompt("請輸入新的名稱");
      if (name != null) {
        this.groups.forEach(function(group) {
          if(group.id === groupId){
            group.name = name;
          }
        });      
        this.editMode = false;  
      }
    }
  }
})

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
  .then(function(registration) {
    console.log('Service Worker Registered. Scope is: ' + registration.scope);
  })
  .catch(function(err) {
    console.log('Service Worker registration failed: ', err);
  });
}