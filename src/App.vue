<template>
  <div id="app">
    <h1>Info WiFi</h1>
    <button @click="checkWifi">Check WiFi</button>
    <ul v-if="wifiList.length">
      <li v-for="(network, index) in wifiList" :key="index">
        <div class="network-info">
          <div class="ssid">SSID: {{ network.ssid }}</div>
          <div class="security">Security: {{ network.security }}</div>
          <div class="wps">WPS: {{ network.wps ? 'Aktif' : 'Dinonaktifkan' }}</div>
          <div class="safety">
            {{ getSafetyStatus(network.security, network.wps) }}
          </div>
        </div>
      </li>
    </ul>
    <div v-else>
      <p class="no-wifi">Tidak ada jaringan WiFi yang ditemukan.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      wifiList: []
    };
  },
  methods: {
    fetchWifiInfo() {
      fetch('http://localhost:3000/api/wifi')
        .then(response => response.json())
        .then(data => {
          this.wifiList = data;
        })
        .catch(error => console.error('Error:', error));
    },
    checkWifi() {
      this.wifiList = [];
      this.fetchWifiInfo();
    },
    getSafetyStatus(security, wps) {
      if (security.includes('WPA') && !wps) {
        return 'Aman';
      } else {
        return 'Kurang Aman';
      }
    }
  }
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

button {
  font-size: 1em;
  padding: 10px 20px;
  background-color: #4c60af;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}

button:hover {
  background-color: #4c60af;
}

ul {
  list-style-type: none;
  padding: 0;
}

.ssid, .security, .wps {
  margin: 5px 0;
}

.no-wifi {
  color: #514c4b;
  font-weight: bold;
  margin-top: 20px;
}

</style>
