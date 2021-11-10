<template>
  <div>
    <meta http-equiv="Content-Type" content="multipart/form-data; charset=utf-8"/>
    <button @click="test222()">多文件上传</button>
    <button @click="test333()">上传</button>
    <input type="file" ref="clearFile" @change="getFile($event)" multiple="multiplt" class="add-file-right-input"
           style="margin-left:70px;">
    <el-button>这是element</el-button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Index',
  data() {
    return {
      addArr: [],
      fileList: [],
    }
  },
  methods: {
    test111() {
      axios.get(
        'http://localhost:9090/user',
        {
          params: {
            file: this.addArr[0]
          }
        }
      ).then(function (response) {
        console.log(response.data)
        console.log(response.status)
        console.log(response.statusText)
        console.log(response.headers)
        console.log(response.config)
      })
    },
    test222() {
      let formData = new FormData()
      for (let i = 0; i < this.fileList.length; i++) {
        formData.append('files', this.fileList[i])
      }
      const config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      axios.post(
        'http://localhost:9090/uploadFile',
        formData,
        config
      ).then(function (response) {
        console.log(response.data)
        console.log(response.status)
        console.log(response.statusText)
        console.log(response.headers)
        console.log(response.config)
      })
    },
    test333() {
      let formData = new FormData()
      formData.append('file', this.addArr[0])
      const config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      axios.post(
        'http://localhost:9090/uploadFile',
        formData,
        config
      ).then(function (response) {
        console.log(response.data)
        console.log(response.status)
        console.log(response.statusText)
        console.log(response.headers)
        console.log(response.config)
      })
    },
    getFile(event) {
      debugger
      let file = event.target.files
      for (let i = 0; i < file.length; i++) {
        //    上传类型判断
        // let imgName = file[i].name
        // let idx = imgName.lastIndexOf('.')
        // if (idx !== -1) {
        //   let ext = imgName.substr(idx + 1).toUpperCase()
        //   ext = ext.toLowerCase()
        //   if (ext !== 'pdf' && ext !== 'doc' && ext !== 'docx') {
        //
        //   } else {
        // this.addArr.push(file[i])
        this.fileList.push(file[i])
        // }
        // } else {

        // }
      }
    }
  }
}
</script>

<style scoped>

</style>
