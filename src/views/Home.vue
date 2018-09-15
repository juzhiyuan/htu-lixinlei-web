<template>
<div class="home">
  <mu-container>
    <mu-form :model="form" class="mu-demo-form" label-width="100">
      <mu-form-item prop="radio" label="模式">
        <mu-radio v-model="mode" value="update" label="更新卡号"></mu-radio>
        <mu-radio v-model="mode" value="create" label="创建"></mu-radio>
      </mu-form-item>

      <mu-form-item prop="input" label="学号">
        <mu-text-field v-model="form.BH"></mu-text-field>
      </mu-form-item>

      <mu-form-item prop="input" label="姓名">
        <mu-text-field v-model="form.Name" :disabled="mode === 'update'"></mu-text-field>
      </mu-form-item>

      <mu-form-item prop="radio" label="性别">
        <mu-radio v-model="form.Sex" value="男" label="男" :disabled="mode === 'update'"></mu-radio>
        <mu-radio v-model="form.Sex" value="女" label="女" :disabled="mode === 'update'"></mu-radio>
      </mu-form-item>

      <mu-form-item ref="CardNo" prop="input" label="卡号">
        <mu-text-field v-model="form.CardNo"></mu-text-field>
      </mu-form-item>

      <mu-form-item prop="input" label="详细信息">
        <mu-text-field v-model="form.Department" :disabled="mode === 'update'"></mu-text-field>
      </mu-form-item>

      <mu-form-item>
        <mu-button color="primary" @click="search" v-if="searchBtnShow">搜索</mu-button>
        <mu-button color="error" @click="updateDialogShow = true" v-if="updateBtnShow">确认更新</mu-button>

        <mu-button color="error" @click="createDialogShow = true" v-if="createBtnShow">创建</mu-button>
      </mu-form-item>
    </mu-form>

    <mu-dialog title="确认更新？" width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="updateDialogShow">
      确认更新该学生卡号吗？
      <mu-button slot="actions" flat color="primary" @click="updateDialogShow = false">取消</mu-button>
      <mu-button slot="actions" flat color="error" @click="update">确定</mu-button>
    </mu-dialog>

    <mu-dialog title="确认创建？" width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="createDialogShow">
      确认创建该条记录吗？
      <mu-button slot="actions" flat color="primary" @click="createDialogShow = false">取消</mu-button>
      <mu-button slot="actions" flat color="error" @click="create">确定</mu-button>
    </mu-dialog>
  </mu-container>
</div>
</template>

<script>
import Toast from 'muse-ui-toast'
import * as api from '@/api'

export default {
  data () {
    return {
      mode: 'update',
      updateDialogShow: false,
      createDialogShow: false,
      form: {
        CardId: null,
        BH: null,
        Name: null,
        Sex: null,
        CardNo: null,
        Department: null
      }
    }
  },
  created () {
    this.$store.commit('updateAppbarTitle', '首页')
  },
  methods: {
    async update () {
      for (let key in this.form) {
        if (!this.form[key] || !this.form.CardNo) {
          this.updateDialogShow = false
          Toast.info('请补充完整')
          return
        }
      }

      try {
        await api.updateUserinfo(this.form)

        for (let key in this.form) {
          this.form[key] = null
        }

        Toast.success('更新成功')

        this.updateDialogShow = false
      } catch (e) {
        Toast.error('更新失败')
      }
    },
    async create () {
      for (let key in this.form) {
        if (!this.form[key] && key !== 'CardId') {
          this.createDialogShow = false
          Toast.info('请补充完整')
          return
        }
      }

      try {
        await api.create(this.form)

        for (let key in this.form) {
          if (key !== 'BH') this.form[key] = null
        }

        Toast.success('创建成功')

        this.createDialogShow = false
      } catch (e) {
        Toast.error('创建失败')
      }
    },
    async search () {
      // TODO: 搜索成功后，光标定位在 CardNo
      for (let key in this.form) {
        if (key !== 'BH') this.form[key] = null
      }

      if (!this.form.BH) {
        Toast.info('请填写学号')
        return
      }
      try {
        // 1900000000
        const res = await api.getUserinfo({
          BH: this.form.BH
        })

        const dataArr = res.data

        if (dataArr.length === 0) {
          // 未查询到数据
          Toast.info('该学号无对应数据')
          return
        }

        const { CardId, BH, Name, Sex, Department } = dataArr[0]

        this.form = {
          CardId,
          BH,
          Name,
          Sex: Sex.indexOf('男') !== -1 ? '男' : '女',
          Department
        }
      } catch (e) {
        console.log(e)
        Toast.error('系统异常，查询失败')
      }
    }
  },
  computed: {
    searchBtnShow () {
      return this.mode === 'update'
    },
    updateBtnShow () {
      // 名字不为空，说明已查询到数据
      return this.mode === 'update' && this.form.Name
    },
    createBtnShow () {
      return this.mode === 'create'
    }
  },
  watch: {
    'mode' () {
      for (let key in this.form) {
        this.form[key] = null
      }
    }
  }
}
</script>

<style lang="less">
.mu-demo-form {
  width: 100%;
  max-width: 460px;
}
</style>
