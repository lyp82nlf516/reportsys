<template>
  <div class="optionlistbox" id="optionlistbox">
    <el-table :data="optionlist" border>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.url" width='20'>
        </template>
      </el-table-column>
      <el-table-column label="名字">
        <template slot-scope="scope">
          <el-input v-model="scope.row.label" placeholder="请输入内容" @keyup.enter.native="submitlabel(scope.row)" @blur="submitlabel(scope.row)"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="顺序">
        <template slot-scope="scope">
          {{scope.row.ordercode}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <img src="../../assets/img/imgchart/up.png" width='20' @click="up(scope.row.ordercode)">
          <img src="../../assets/img/imgchart/down.png" width='20' @click="down(scope.row.ordercode)">
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="currentpagechange" :total="total" :current-page="offset" :page-size="pageSize" layout="total, prev, pager, next, jumper">
    </el-pagination>
  </div>
</template>
<style lang="scss">
#optionlistbox {
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  overflow: auto;
  padding: 10px;
  .el-pagination {
    background: #fff;
    padding: 10px 5px;
  }
  .el-table td,
  .el-table th {
    padding: 5px 0;
  }
  .el-table .cell img {
    vertical-align: middle;
  }
  img:hover {
    cursor: pointer;
  }
  .el-input__inner {
    height: 30px;
    border: 0;
  }
  .el-input__inner:hover {
    height: 30px;
    border: 1px solid blue;
  }
}
</style>
<script>
import {
  listimg,
  editimg,
  addimg,
  delimg
} from '@/services/query';
export default {
  data() {
    return {
      optionlist: [{
        id: '1',
        label: '报表名',
        ordercode: 0,
        type: 'formname',
        param: 'text',
        url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAC2UlEQVRYR+2XO2gUURSG/zOz80JRLESFGDczRAUbRYsEgyJbCGkEX2Aj+GgsYqNgI9grWASxUQgRRcGopDFWhqAghoCCRglkdxOLgCgYSMzM3Nm5RwaNLMnO7uxssjbeds7ju/+5594zZKLVhqHdBiNHhAwSLmZ89oR7AJj5ntClohmZuv0BhLcI5f3EgRT1BYhnwBCe8LoagSBTd0TIsisIiqNJAUzdXoCU3VCVq2C0NAIRKVAKGR1BUBirB4BkmHNL02Om4QyC2U4L0SjAGwAZS3cGGLwzDcRKAETCKaZu3wOwr16IlADOuIS8JkRxoKxsUay7APZ7otQJfPmRpKTpADLZg6Qoz0C0oVKSkPm4EIUnqwbwO3CLZWWMPYxQL09EqvogZL7YBIDK+zMNZ1IyX/kP8C8VGGbguu/nh1b5ECYJX9smVRsuDavr9jGF6DCAVnD0SNGIF+T7a6cHGgYwdecRwCcIGJLAuALazkA3iF97/twR4Nt8NZCGAEzNPgOi3pD5UPljZhh2uwJ6yYxhT+RPrx6AYRdY8k0/KN6qUJajCjDgibl11VRoQAF7vWXQrOu7G2MGEs3UnZ+QMueViq/iVEgNoGnZ3RlFfef6eYoLbhn2jASdq9aSqQAs3X4KUCsIexkYia0xo5PAEwAmXFE4BaC01DYVQDSSMeMysfxUq9VIUTeD8ND1ww3A1OyKAfwZyaKJqOoykc2SoRabALBti5mhHV4J78t32jQAy3B6AfQwc58nCmcXZWkagKm1nSdFuSOl7Cm/F2oCRK0SsrwgxNRgrXr+3ZVuLyw/A5vWWMbaeQm0+35+MrECltF2iZluEDDKRF4shOR+Lyj0Rd+jLlgOkDUtQ3XZL9kepouJASJDS8t2MFEOIC0OIGR+vvj3VBkAsPS2k64oPgbAdQEklb56CWJmxFptWG/yxRKs2EWUDsD5SIRdyX35q+sXtgIIlvr8AoDbUz+jlLE3AAAAAElFTkSuQmCC'
      }, {
        id: '2',
        label: '键值对',
        ordercode: 1,
        type: 'val',
        param: 'val',
        url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABF0lEQVRYR+2XPQ6CQBBG52sAo50nEI5gYakXsLey1VsYj6GdlQcw9tqZGI8A3sBKA0szBhISIJv1b4GYLA0hC8zjzWZmADV8oOH4ZAC0GrDt3hiMviytDDoLEezLa1oBHMu9A2hL9xXzLYyDbqUAeQMAFkkwZl6m5zoM5L+uZXucXIfCV1rWmoKvAVqWeyJg8GtNYOJVJIJ58p6yAcdytwAmWQwmOkbCH6UGspvrBMjSUwB4la9PAFV7IL9mAIwBY8AYMAY09wJaR8KfyZuRtwFomi/nSelPARzbO4Bo+Emtl45d9D5AoRv+Glj2/H8NJLoMqGdCvghx3VU6lKqmYmZ+RHHQqRRA/V9Qg4FvUlnZVPwuTOMAT4GeBzBnyLkZAAAAAElFTkSuQmCC'
      }, {
        id: '3',
        label: '表格',
        ordercode: 2,
        type: 'list',
        param: 'list',
        url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABYElEQVRYR+2Xz0rDQBDGv0klm72K/aNQlW5vfQHxJbx5U+hBfAYfwKfQgx4Ej76E4NmTl5S2CPVP0eMmS9KRKpUYaikkYQWzx12Y78e3M8MMwfIhy/pIAWw3pOucAdgF0WrOcGMw32kzOQL6T7PYCYB2VYrJPUCNnIVT4Xikw6gDDN+nD98AnqsuiXAIxk2M+MSY/kOeIK7b7lTApyDsMfNFYHrdHwBSqFcAazpEHfBf8hSfxZJQTQgMAYx16FeTACSFmkwvdOgXmZifOszMgek5JcDfdKCI5EvHXJgD1gEWVIEjhYqT9CnYZSopUxWUAKUD/8QB633AOkDZiEoHbDkAKVrPANV0GG0Ag9GcasjciCRamxA0APCoQ785dyxn5uvA9A4ARCmIrAArnquuiLA/dywHVE0Kni4m9WJ7wS+LyZfo1rrnVs4J2Ml9NWN+A3CrTXyc/OIid4CljLQO8AG1l+YwaRIxwgAAAABJRU5ErkJggg=='
      }, {
        id: '4',
        label: '柱状图',
        ordercode: 3,
        type: 'bar',
        param: 'bar',
        url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABMElEQVRYR+2XsUoDQRCG/9mY3attRSG3bbDRJ7DIK1iIhc+gtdhaxM7Gykp8AZH0ChZ2KSzkNshBXuHu9vRGDiEaOCSXuHcgu/XMvx///CyzhJYPtXw/ZgCBDE9BtEfM94k1502B/QDQt0TYZ+br1JojD+AdWNUBKXW/QxiXOklmN4B4WqXpLIQewKkDCpuaZPewnGlqzVnVbN0CrPUGoiNGXwGLKp/zxgGk7G2Lgtf5/SPOEEeNAwQqHBFoUBR8keXm+H8BBDIcE1EfKE6SbDJUFRlw6oAH8A54B7wDq25Hv/U724gWhf4G6OpnCN4B8ArGw6ICS9UxPaV5dFX2zgCUDN8E0dZSgjWbmPkmteZgHkDpOwLvMmNKwEtNzVrlzPyY5ZPLOYBaCn9Y3Prv+BMHYSE//RGjCgAAAABJRU5ErkJggg=='
      }, {
        id: '5',
        label: '折线图',
        ordercode: 4,
        type: 'line',
        param: 'line',
        url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACAklEQVRYR+1XMW/TQBh9nxvb8US3LgyN8ydKJYTE1KkDSIgF1nQBMVaqgCIqISYYqcTCwEYH4A+AxAIDCwtD44QBqcBQVULUPsf3kCvSXtokVzvQVChe/d1773vfO/tOMOZHxsyP0ySgNlP1pBErrgOtbyflzL4DVa+2IuKskbgdq+baGASEqyJyl+S9WEWrEwH/pQOBOzuXiZxVqvWi26ARwn+bAd+vLQqdDQC/YtWcBsBcxIkIMMhB0ZeTpPVqFAcqgR/eRIYPu53onS0rB+QUCi+Z5GUcqARefQOCRRIJdLYQd9pvBonwK7ML4ky9Rt43eNWcfRkH9slB7kDkzDARf8hfApwaRF7EgQNycIuJPgfPaYjIcj8RBrmrwSv9Oi/igEGOHxqYT5LmZg5Q9cIHh0WY5ACuxSp6Piwntl1g2r6dQc8r1f5sAgZu+AiO3NpzAvo+4NwB6B6H3DaCnplnwHmlok/9uumKyN+RzPe3tXPrCKpe/ZkIrpP4mbFzIU2/fBxmZeCGjym4AbIRp62ntu1pFRD49a8kpzPqi2nafn9cwKJ1QzJQmwEcAs3vRUGL1NtCWASrVO1EwMSBow4Ab0EO/MOVSlrvIsaKT7pH/yPH8r9AYIcgl3dV9LDnUwzsXUyWzFOSHalUBWOl14H21iEBpcBGXnSa7oYjN1MK4DfdCJAwRxZwvwAAAABJRU5ErkJggg=='
      }, {
        id: '6',
        label: '饼状图',
        ordercode: 5,
        type: 'pie',
        param: 'pie',
        url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAENUlEQVRYR8WWXWgcVRTH//+7mS+pL9Jiqa1mZi2iIJZIQzEvgiJoQB+sL5agBa0Imkj9jB+RUJRihaQqmKIIYtRasfhQsG9SHyqpKGhBEZnZJBStFtpilJm5sztHZpK1+djJ7LYPPU87O/9z7u+ec++ZQ1xm42VeH50CdJmmd6MS9mTgURIfAk6Fl7KJdgEMy3B3KaVeBbDu/wVFpkIdbMueLcvrJzAIcCaVZFzr2Z/bASsFMIzqrRWFgwSubwYUwCdQzZ7DOPsJ2GZ1jsSaRZpjjbS+O0lmflgNZFUAx3KfFlF7SXRB5GxK7Inj9CAwfdqxqrIIgI5VTfOFRIZBDAFcL4KYwEOh9j8rgigEcAxvDIpP5TEh70bx3HPAmX+agYoAFjJi2KY3THJ0nindE+naSCuIlgC26Y2SHBGRBkR2Rknto+XOJQC53DbcR0EeIEkR2RHp4JPlcVYAOEb3NqE6ngkJ7Ah18Gkr8nYA5iGqu6hwICtHCtmqdXBycbzlAMq2PJ9gN4B3wth/sqh27QJk/o7hjUNxSATHI+33FQKYZvd9FVa+BOR0GM9tXlzziynBBZ+NjmNZswDW1lPpTZLgu+a7JRlwTO8IyH6R9OVI115b7fp0koE8C5b7DKD2QeRwqIP7WwEYtln9F5BKpBsbgZk/OgDI+kCSX9dyOxXG/qYVAIbhbe1SPCGCXyLt31QWZ1kGYJvui6RaNWsQOSeQwUjXJlcA2Ib7CJV6T0QmIx0MdApQpi9tRJblDSlwHKnsD5Mgb0CrmW1WNQkjjNP1QO3PMn0pQNZ2AfUmUhkLk2B3WUDbqn5N4PYy3fL3ApmO4noPMHtuodfMSyyj+phSmGi7BPCuFYsTENyZZaITEEnxcJT4Hy4ByDogVOVbiPwU6uCWTgK2q3XM6vcgetBAX1j3m9226b7hCtt0zgOiIi3XXEpdWwNtWOtYzhkR1CPtOwDqSzKQNwvT+xzk9hQYjGP/7XZ31o6ueU0FOBrF/t0rrmF+DiyvX4FHBDIbxUE2gCTtBC/XXGjFKXBPHPtftQRYyMIUyF6R9KVI114vD16usMzqG4p4FiInF85XPsysKEH2h2F0b6mwciI7C0jTO6L69LHyJYoVVpd7FxWPZnNJQ6QnSWo/LlYXDSQPkvxYBH8jbdx7sRC24Q6A6n0SZtEHrngkM73nQe7NpiKSw2HsjzVPbnlG1q2xzSvfIrkz0wpkIoqDx1v5rT6Umu4DAjU5vwP5DcBopINDxYfTvdqxMCDgEwSvE4Em8Eqo/X05RwsrHcsty72Boj4gcVvuL3IW4DcQmRHifH6QyKsg6BPIFpJqQXc4JV6I4yADL7RSgKanabrbK+AIyJuLw8lfAnwhkP1xXPu1vFT53NmZGYbbWyE3E9gkgE3KHIS/Q9JamExPFaW6aJWOATrDLVdfdoD/ABKl7jC6Uj6xAAAAAElFTkSuQmCC'
      }, {
        id: '7',
        label: '下拉',
        ordercode: 6,
        type: 'select',
        param: 'select',
        url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACEUlEQVRYR+2Xv3LTQBDGv5WtO7nCwwwVmUGxBgKEGbuidk+YSZ6AUFECNT0NDSXQEB6AP29AOto4MJBArCRAKgqgknSKbxnZKAjjKLIlERe5TjN7+/32253THeGYFx2zPoYAZk5LU9wjAy2AKsXCcY803vZo/4lSn9/HuRMAM2ctKd8Q2GTQZrHig2wEvsBMZzTCZgxxACCF84CAO0w8HwTuxzIALJybhah+INaPvXD79gDq96qJxgsG5n3lzpUhntDpAPjiKXdhCMB5yeCLvnIvlQywxsCer9xrJwDT7YAQzqIBbhYxDxrUUar7KspVE42sM2DXa8JYBVE+COaOp3Qb2PkxJkAUng+Cwbt+oFux+AQAgGnarSr1nTg1VjuYf+6zbofhzlpy3xgt+LNtbIhDxCdyIMawqnabKpXXWVzoMZbioRuOn8iBAwjTWSYDT9MgWOOmH3ZXDovJBRAltVIgNPhuELgP0wBzA/QhhLNChBtJIWY881V3+agWFQIwDJFVPNcQjqrMks4qMdc95baOqjzxO856EmZJadcHUYNTLssqrAVZxEbFnABMswON5wxc+Q+X0nUAu55yr0czMupafjkI3E+TDlnaPgu2DVHZJNaP/rmWS9k4T0zviPg7gzbKAIgeJv28QXDVw97XvxyIPqScnTM03WIDzZKeZuteaNwHtr7FBU7b47QM49Nz/gK1+KkwpLC2JAAAAABJRU5ErkJggg=='
      }, {
        id: '8',
        label: '输入框',
        ordercode: 7,
        type: 'input',
        param: 'input',
        url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABAElEQVRYR+2WXQrCMBCEZy2k9gyiiPVB8Qc9idfRE+h1vImgoC8tot6hNtCuNKJUxT9IqEL2sYGdLxO6s4SCiwrWhwWwDvyOA0LURyU4UyK0Tf4ZzFinSCZSbueZztUBz/UPAComxXO9D1EcVO8BOPuQMPelDJcmQIRodhziVdY7igN1+bwDCuByYAIg6+m5/o3OUwBPNBYAOJLhUCfM5wB3pLogLIB1wDrwRw6cBxEiGQ50zYCvJqFO0Xyvt0+QMHpSBiowdJcQftchqKB7CKOy6+8IUBFpuhjYH+OgdpOG54WkNCOilkkAZt6kSMcPC4lJ0Ve9f2cntA5YB4py4AT2+8EhQCpAoQAAAABJRU5ErkJggg=='
      }, {
        id: '9',
        label: '时间',
        ordercode: 8,
        type: 'date',
        param: 'date',
        url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFU0lEQVRYR+2XW4wURRSG/9MzU93NcjEGMCyXne3mEhSXZQERo1GjPvggJpKIgnjH+AAxkEhWDSQgaogaiQkh8RYeUJBEI9EYH4yaeEGQqwIRtXsHshAEVFhYuqqmp47p2ZlldhbYJSzyYj31pc45X586f51qwhUe1HP8kbWOSD8qtXoLOHy85/nJjGtq7EzNwyqvNgKH/rqQTY8AjvCWEdFSsJkV6ZaNvQEQwrsvRfQRM5ZIHazoLYDlpLO3wLJuBVBHht6L4uB7R3ivEFEzMz8kdfi+EN5Mi2hBp1PGAQAHQZhaMIXmfD63yxX+AyCsN4xXlQ4WZzLZaSmy7gbABNofabUJaI0SH6UMjLYd23xKoLvO0vLqSIXzbeGttIgWM5u5UresKwOd66sMeKFS4SpHeHOIaJ1hvKZ08Kwj6pcTWUsqbFojpSYCrX8XAeyM97pl0SIwb2ODZsAUZJzaBwRHHeG/RITnwTw70uH6BNrNZKcxw6mGkPHp7cDxU66ovx9kfcjMK6UOm4s2af8mBrtkYQWIpjHwjlTBvCKAa/tHmXkwtPEkcrlKx67wZ4H4zdiYGfl8bktvaiCTqWtKW+kvmHlhsmxd/MEbxQI5Ak5EOrw6ARCu7Stm/k3qcFxvAlzqHEf4ewCMljpwKJGMa/c/naQ/0uHUS3XeG3tH+D8QYXqkAroiAK7wN4NwY6QCm4Ah/V174CkwdkQ6mNybL7jUOa7wtoDohkjRoAoA3hXpcFK186SgUkwDC8Rt+fyBHRXvhZPOTkdMOYmWZC/oHLZdP44KPIwIMuooXO5a2N5WEE2NFA0lYPAA1x7UBubdkQ4buysAG8rPYmMa8/mW3cm9I/wNRJiVXDPzBqnDB5NrIerGpyi9r2zDzHOkDj+o8rsNhMlQGFUJ8Eukw4bKiY7wlhLRsvKzAvNMrcOPO6TrHQZoWBEAfECqMNsBkL03RalPzgKYF6VuWVoFsB2EJgOMIWD0QNfmk8y8R+rw+i4AGe9xsujdTmcFvkvG4ZelDOwlwrWld62RCkZ2ANQ3pMgqZikZ5d2xagl2gqixwDShAgD7pA6uq6oByxH1z4HoNjCOSB0+BiBO5mQy2cYUWQtA5BsuvKF1blPZ1hVeshxzGNQuddsTwLHTVQC7QDQxNpjSKUPmcwJU8fTNrSu83SBqiE3cREBtP9d225mxV+pgQt+EuLAXV3jFDJSWoAzQvQaArGPb1tPEuIoIbZHSa8pt1BHebBDNA/MRMlgdxeF35bBOxn8KxLUEyEhjDRCePFcNGPBYAka4rm2fAXN3FWTqnyTLeruioO5RKvysowi9/UQ0tkMF+EOqYExRHWnvZqTo204bY+arfMvqKhXsAGESK5OtBPg50uHELioQ/hIiLD+rAtwh4+CrYiDbbwUwvPTuWKSCocm1bdfPsGB1FiTz+WUYqTjJUmcGum1ETtq/HRZ/TkTF3l/gwnitc7+WZLiWCI8UARg/RjqY3gEzYrgjRJKdGmYuwJg7ZZz7pioDxY0oUtEQStbZtVMR+NxbcdItnXS/Jk7hqFIt+ysd2bY3hgqmVsbt2yul5qCuHmmqM5Y5qvXBzl2xQqY/gWhKqReUAbAz0kHTf6SCUi8ouMmBJOXafszMv0sdFovqco9yAZfOA4Bj+wEYw6XODwMO/nN5AZIasZNj3xmpg6QdA27GWwWLngHzVjZ4Qcbtm4E/2/sWJKmlmulk4eWkFTPzOqnDuaVj+ZD+rhjwdVIYfRv0vN6OQ8lJEQ61Vv4ZCVd4ixhoABXbbI9/TRcJy2A+xIRtSpm1QO5EYt/XQS6S6X8A4F/+h4gb7Ldv8QAAAABJRU5ErkJggg=='
      }, {
        id: '10',
        label: '文本',
        ordercode: 9,
        type: 'text',
        param: 'text',
        url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB/UlEQVRYR+2VMWsUQRTH/2/vdmY2X8BGhOzmU9gImqAognZWwUasBBsLsbSxEISUqVQOCy0iGCOIoFUam9Th9gzBRuxOZWcmxz7ZHDHLuXs3d9kxKZxyYeb3e/N/+4ZwzIuOmY//Aj5vIFQi6QDoaps+qIvak8DpSEnxhkAXCnDOeGxseq9KwotAJJMVAHfKwDoJLwIKZ2KS7U2ATpUlmPmRtr375W9NCpASyUMmfm5Mb7tSgnk9s72rPgQK+FMiLAP8jc3grMZuryzBwDtt6DrQNU0LlOAHRx9KSJksgHHb2LS4+sFoIx41AlIifkFEN/7u8EOJcdP2KAItJeJONXyIZMYzbdObPgRakYhfgYpMaxbzVmaDc0C337RAOxLxyybghdi0ERTw1yC6Mqbyz5kNFidVfrB/GgFH+I/zwPefrs+8q0AYiXhtcuXTwV0jCJWM3xJoqb7fsKlt/+I0lTtGsCCVzItXbQLcLAJfM9drd56EKpy/RUGwOr7y2eETI4hEsgbCtSoBBj5pYy7PWrlLBMWk6xPR3KjAEE6XRh+WRiOQ7fmloBW89wkfG0EUxk8Q0N3hTOdfBPrAnK/rPe4AO3qWaqv21M4BJZMNynk7Z94wgy8fAew1BXX+C3wAR890nYTeXP4IRDJhb5SKgzOT7rNPjsC/rP5ENeFv1KbXIZ3aA54AAAAASUVORK5CYII='
      }, {
        id: '11',
        label: '地图',
        ordercode: 10,
        type: 'map',
        param: 'map',
        url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB/UlEQVRYR+2VMWsUQRTH/2/vdmY2X8BGhOzmU9gImqAognZWwUasBBsLsbSxEISUqVQOCy0iGCOIoFUam9Th9gzBRuxOZWcmxz7ZHDHLuXs3d9kxKZxyYeb3e/N/+4ZwzIuOmY//Aj5vIFQi6QDoaps+qIvak8DpSEnxhkAXCnDOeGxseq9KwotAJJMVAHfKwDoJLwIKZ2KS7U2ATpUlmPmRtr375W9NCpASyUMmfm5Mb7tSgnk9s72rPgQK+FMiLAP8jc3grMZuryzBwDtt6DrQNU0LlOAHRx9KSJksgHHb2LS4+sFoIx41AlIifkFEN/7u8EOJcdP2KAItJeJONXyIZMYzbdObPgRakYhfgYpMaxbzVmaDc0C337RAOxLxyybghdi0ERTw1yC6Mqbyz5kNFidVfrB/GgFH+I/zwPefrs+8q0AYiXhtcuXTwV0jCJWM3xJoqb7fsKlt/+I0lTtGsCCVzItXbQLcLAJfM9drd56EKpy/RUGwOr7y2eETI4hEsgbCtSoBBj5pYy7PWrlLBMWk6xPR3KjAEE6XRh+WRiOQ7fmloBW89wkfG0EUxk8Q0N3hTOdfBPrAnK/rPe4AO3qWaqv21M4BJZMNynk7Z94wgy8fAew1BXX+C3wAR890nYTeXP4IRDJhb5SKgzOT7rNPjsC/rP5ENeFv1KbXIZ3aA54AAAAASUVORK5CYII='
      }, {
        id: '12',
        label: '柱状图和折线图',
        ordercode: 11,
        type: 'barline',
        param: 'barline',
        url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB/UlEQVRYR+2VMWsUQRTH/2/vdmY2X8BGhOzmU9gImqAognZWwUasBBsLsbSxEISUqVQOCy0iGCOIoFUam9Th9gzBRuxOZWcmxz7ZHDHLuXs3d9kxKZxyYeb3e/N/+4ZwzIuOmY//Aj5vIFQi6QDoaps+qIvak8DpSEnxhkAXCnDOeGxseq9KwotAJJMVAHfKwDoJLwIKZ2KS7U2ATpUlmPmRtr375W9NCpASyUMmfm5Mb7tSgnk9s72rPgQK+FMiLAP8jc3grMZuryzBwDtt6DrQNU0LlOAHRx9KSJksgHHb2LS4+sFoIx41AlIifkFEN/7u8EOJcdP2KAItJeJONXyIZMYzbdObPgRakYhfgYpMaxbzVmaDc0C337RAOxLxyybghdi0ERTw1yC6Mqbyz5kNFidVfrB/GgFH+I/zwPefrs+8q0AYiXhtcuXTwV0jCJWM3xJoqb7fsKlt/+I0lTtGsCCVzItXbQLcLAJfM9drd56EKpy/RUGwOr7y2eETI4hEsgbCtSoBBj5pYy7PWrlLBMWk6xPR3KjAEE6XRh+WRiOQ7fmloBW89wkfG0EUxk8Q0N3hTOdfBPrAnK/rPe4AO3qWaqv21M4BJZMNynk7Z94wgy8fAew1BXX+C3wAR890nYTeXP4IRDJhb5SKgzOT7rNPjsC/rP5ENeFv1KbXIZ3aA54AAAAASUVORK5CYII='
      }],
      total: 0,
      offset: 1,
      pageSize: 10,
    }
  },
  mounted() {
    this.Getlist();
    this.del();
    //  this.Addimg();
    // 恢复初始数据，防止数据库存入的垃圾数据无法清除
    // this.Editlist(this.optionlist[0]);
    // this.Editlist(this.optionlist[1]);
    // this.Editlist(this.optionlist[2]);
    // this.Editlist(this.optionlist[3]);
    //  this.Editlist(this.optionlist[4]);
    // this.Editlist(this.optionlist[5]);
    // this.Editlist(this.optionlist[6]);
    // this.Editlist(this.optionlist[7]);
    // this.Editlist(this.optionlist[8]);
    // this.Editlist(this.optionlist[9]);
  },
  methods: {
    // 上移位置
    up(val) {
      if (val > 0) {
        this.optionlist[val].ordercode--;
        this.optionlist[val - 1].ordercode++;
        [this.optionlist[val], this.optionlist[val - 1]] = [this.optionlist[val - 1], this.optionlist[val]];
        this.Editlist(this.optionlist[val]);
        this.Editlist(this.optionlist[val - 1]);
      }
    },
    // 下调位置
    down(val) {
      if (val < this.optionlist.length - 1) {
        this.optionlist[val].ordercode++;
        this.optionlist[val + 1].ordercode--;
        [this.optionlist[val], this.optionlist[val + 1]] = [this.optionlist[val + 1], this.optionlist[val]];
        this.Editlist(this.optionlist[val]);
        this.Editlist(this.optionlist[val + 1]);
      }
    },
    // submitlabel修改工具栏组件名
    submitlabel(row) {
      this.Editlist(row);
    },
    // dragListData
    currentpagechange(val) {
      this.offset = val;
      this.Getlist();
    },
    // 自定义排序函数，通过比较返回值来对数组某元素的属性进行排序
    compare(property) {
      return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
      }
    },
    // getlist
    Getlist() {
      let param = {
        offset: this.offset,
        pageSize: this.pageSize,
      }
      listimg(param).then((res) => {
        if (res.status === 200) {
          let data = res.data.rows;
          for (let i in data) {
            if (data[i].type === 'select') {
              data[i].url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACEUlEQVRYR+2Xv3LTQBDGv5WtO7nCwwwVmUGxBgKEGbuidk+YSZ6AUFECNT0NDSXQEB6AP29AOto4MJBArCRAKgqgknSKbxnZKAjjKLIlERe5TjN7+/32253THeGYFx2zPoYAZk5LU9wjAy2AKsXCcY803vZo/4lSn9/HuRMAM2ctKd8Q2GTQZrHig2wEvsBMZzTCZgxxACCF84CAO0w8HwTuxzIALJybhah+INaPvXD79gDq96qJxgsG5n3lzpUhntDpAPjiKXdhCMB5yeCLvnIvlQywxsCer9xrJwDT7YAQzqIBbhYxDxrUUar7KspVE42sM2DXa8JYBVE+COaOp3Qb2PkxJkAUng+Cwbt+oFux+AQAgGnarSr1nTg1VjuYf+6zbofhzlpy3xgt+LNtbIhDxCdyIMawqnabKpXXWVzoMZbioRuOn8iBAwjTWSYDT9MgWOOmH3ZXDovJBRAltVIgNPhuELgP0wBzA/QhhLNChBtJIWY881V3+agWFQIwDJFVPNcQjqrMks4qMdc95baOqjzxO856EmZJadcHUYNTLssqrAVZxEbFnABMswON5wxc+Q+X0nUAu55yr0czMupafjkI3E+TDlnaPgu2DVHZJNaP/rmWS9k4T0zviPg7gzbKAIgeJv28QXDVw97XvxyIPqScnTM03WIDzZKeZuteaNwHtr7FBU7b47QM49Nz/gK1+KkwpLC2JAAAAABJRU5ErkJggg==';
            } else if (data[i].type === 'date') {
              data[i].url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFU0lEQVRYR+2XW4wURRSG/9MzU93NcjEGMCyXne3mEhSXZQERo1GjPvggJpKIgnjH+AAxkEhWDSQgaogaiQkh8RYeUJBEI9EYH4yaeEGQqwIRtXsHshAEVFhYuqqmp47p2ZlldhbYJSzyYj31pc45X586f51qwhUe1HP8kbWOSD8qtXoLOHy85/nJjGtq7EzNwyqvNgKH/rqQTY8AjvCWEdFSsJkV6ZaNvQEQwrsvRfQRM5ZIHazoLYDlpLO3wLJuBVBHht6L4uB7R3ivEFEzMz8kdfi+EN5Mi2hBp1PGAQAHQZhaMIXmfD63yxX+AyCsN4xXlQ4WZzLZaSmy7gbABNofabUJaI0SH6UMjLYd23xKoLvO0vLqSIXzbeGttIgWM5u5UresKwOd66sMeKFS4SpHeHOIaJ1hvKZ08Kwj6pcTWUsqbFojpSYCrX8XAeyM97pl0SIwb2ODZsAUZJzaBwRHHeG/RITnwTw70uH6BNrNZKcxw6mGkPHp7cDxU66ovx9kfcjMK6UOm4s2af8mBrtkYQWIpjHwjlTBvCKAa/tHmXkwtPEkcrlKx67wZ4H4zdiYGfl8bktvaiCTqWtKW+kvmHlhsmxd/MEbxQI5Ak5EOrw6ARCu7Stm/k3qcFxvAlzqHEf4ewCMljpwKJGMa/c/naQ/0uHUS3XeG3tH+D8QYXqkAroiAK7wN4NwY6QCm4Ah/V174CkwdkQ6mNybL7jUOa7wtoDohkjRoAoA3hXpcFK186SgUkwDC8Rt+fyBHRXvhZPOTkdMOYmWZC/oHLZdP44KPIwIMuooXO5a2N5WEE2NFA0lYPAA1x7UBubdkQ4buysAG8rPYmMa8/mW3cm9I/wNRJiVXDPzBqnDB5NrIerGpyi9r2zDzHOkDj+o8rsNhMlQGFUJ8Eukw4bKiY7wlhLRsvKzAvNMrcOPO6TrHQZoWBEAfECqMNsBkL03RalPzgKYF6VuWVoFsB2EJgOMIWD0QNfmk8y8R+rw+i4AGe9xsujdTmcFvkvG4ZelDOwlwrWld62RCkZ2ANQ3pMgqZikZ5d2xagl2gqixwDShAgD7pA6uq6oByxH1z4HoNjCOSB0+BiBO5mQy2cYUWQtA5BsuvKF1blPZ1hVeshxzGNQuddsTwLHTVQC7QDQxNpjSKUPmcwJU8fTNrSu83SBqiE3cREBtP9d225mxV+pgQt+EuLAXV3jFDJSWoAzQvQaArGPb1tPEuIoIbZHSa8pt1BHebBDNA/MRMlgdxeF35bBOxn8KxLUEyEhjDRCePFcNGPBYAka4rm2fAXN3FWTqnyTLeruioO5RKvysowi9/UQ0tkMF+EOqYExRHWnvZqTo204bY+arfMvqKhXsAGESK5OtBPg50uHELioQ/hIiLD+rAtwh4+CrYiDbbwUwvPTuWKSCocm1bdfPsGB1FiTz+WUYqTjJUmcGum1ETtq/HRZ/TkTF3l/gwnitc7+WZLiWCI8UARg/RjqY3gEzYrgjRJKdGmYuwJg7ZZz7pioDxY0oUtEQStbZtVMR+NxbcdItnXS/Jk7hqFIt+ysd2bY3hgqmVsbt2yul5qCuHmmqM5Y5qvXBzl2xQqY/gWhKqReUAbAz0kHTf6SCUi8ouMmBJOXafszMv0sdFovqco9yAZfOA4Bj+wEYw6XODwMO/nN5AZIasZNj3xmpg6QdA27GWwWLngHzVjZ4Qcbtm4E/2/sWJKmlmulk4eWkFTPzOqnDuaVj+ZD+rhjwdVIYfRv0vN6OQ8lJEQ61Vv4ZCVd4ixhoABXbbI9/TRcJy2A+xIRtSpm1QO5EYt/XQS6S6X8A4F/+h4gb7Ldv8QAAAABJRU5ErkJggg==';
            } else if (data[i].type === 'input') {
              data[i].url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABAElEQVRYR+2WXQrCMBCEZy2k9gyiiPVB8Qc9idfRE+h1vImgoC8tot6hNtCuNKJUxT9IqEL2sYGdLxO6s4SCiwrWhwWwDvyOA0LURyU4UyK0Tf4ZzFinSCZSbueZztUBz/UPAComxXO9D1EcVO8BOPuQMPelDJcmQIRodhziVdY7igN1+bwDCuByYAIg6+m5/o3OUwBPNBYAOJLhUCfM5wB3pLogLIB1wDrwRw6cBxEiGQ50zYCvJqFO0Xyvt0+QMHpSBiowdJcQftchqKB7CKOy6+8IUBFpuhjYH+OgdpOG54WkNCOilkkAZt6kSMcPC4lJ0Ve9f2cntA5YB4py4AT2+8EhQCpAoQAAAABJRU5ErkJggg==';
            } else if (data[i].type === 'val') {
              data[i].url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABF0lEQVRYR+2XPQ6CQBBG52sAo50nEI5gYakXsLey1VsYj6GdlQcw9tqZGI8A3sBKA0szBhISIJv1b4GYLA0hC8zjzWZmADV8oOH4ZAC0GrDt3hiMviytDDoLEezLa1oBHMu9A2hL9xXzLYyDbqUAeQMAFkkwZl6m5zoM5L+uZXucXIfCV1rWmoKvAVqWeyJg8GtNYOJVJIJ58p6yAcdytwAmWQwmOkbCH6UGspvrBMjSUwB4la9PAFV7IL9mAIwBY8AYMAY09wJaR8KfyZuRtwFomi/nSelPARzbO4Bo+Emtl45d9D5AoRv+Glj2/H8NJLoMqGdCvghx3VU6lKqmYmZ+RHHQqRRA/V9Qg4FvUlnZVPwuTOMAT4GeBzBnyLkZAAAAAElFTkSuQmCC';
            } else if (data[i].type === 'line') {
              data[i].url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACAklEQVRYR+1XMW/TQBh9nxvb8US3LgyN8ydKJYTE1KkDSIgF1nQBMVaqgCIqISYYqcTCwEYH4A+AxAIDCwtD44QBqcBQVULUPsf3kCvSXtokVzvQVChe/d1773vfO/tOMOZHxsyP0ySgNlP1pBErrgOtbyflzL4DVa+2IuKskbgdq+baGASEqyJyl+S9WEWrEwH/pQOBOzuXiZxVqvWi26ARwn+bAd+vLQqdDQC/YtWcBsBcxIkIMMhB0ZeTpPVqFAcqgR/eRIYPu53onS0rB+QUCi+Z5GUcqARefQOCRRIJdLYQd9pvBonwK7ML4ky9Rt43eNWcfRkH9slB7kDkzDARf8hfApwaRF7EgQNycIuJPgfPaYjIcj8RBrmrwSv9Oi/igEGOHxqYT5LmZg5Q9cIHh0WY5ACuxSp6Piwntl1g2r6dQc8r1f5sAgZu+AiO3NpzAvo+4NwB6B6H3DaCnplnwHmlok/9uumKyN+RzPe3tXPrCKpe/ZkIrpP4mbFzIU2/fBxmZeCGjym4AbIRp62ntu1pFRD49a8kpzPqi2nafn9cwKJ1QzJQmwEcAs3vRUGL1NtCWASrVO1EwMSBow4Ab0EO/MOVSlrvIsaKT7pH/yPH8r9AYIcgl3dV9LDnUwzsXUyWzFOSHalUBWOl14H21iEBpcBGXnSa7oYjN1MK4DfdCJAwRxZwvwAAAABJRU5ErkJggg==';
            } else if (data[i].type === 'bar') {
              data[i].url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABMElEQVRYR+2XsUoDQRCG/9mY3attRSG3bbDRJ7DIK1iIhc+gtdhaxM7Gykp8AZH0ChZ2KSzkNshBXuHu9vRGDiEaOCSXuHcgu/XMvx///CyzhJYPtXw/ZgCBDE9BtEfM94k1502B/QDQt0TYZ+br1JojD+AdWNUBKXW/QxiXOklmN4B4WqXpLIQewKkDCpuaZPewnGlqzVnVbN0CrPUGoiNGXwGLKp/zxgGk7G2Lgtf5/SPOEEeNAwQqHBFoUBR8keXm+H8BBDIcE1EfKE6SbDJUFRlw6oAH8A54B7wDq25Hv/U724gWhf4G6OpnCN4B8ArGw6ICS9UxPaV5dFX2zgCUDN8E0dZSgjWbmPkmteZgHkDpOwLvMmNKwEtNzVrlzPyY5ZPLOYBaCn9Y3Prv+BMHYSE//RGjCgAAAABJRU5ErkJggg==';
            } else if (data[i].type === 'pie') {
              data[i].url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAENUlEQVRYR8WWXWgcVRTH//+7mS+pL9Jiqa1mZi2iIJZIQzEvgiJoQB+sL5agBa0Imkj9jB+RUJRihaQqmKIIYtRasfhQsG9SHyqpKGhBEZnZJBStFtpilJm5sztHZpK1+djJ7LYPPU87O/9z7u+ec++ZQ1xm42VeH50CdJmmd6MS9mTgURIfAk6Fl7KJdgEMy3B3KaVeBbDu/wVFpkIdbMueLcvrJzAIcCaVZFzr2Z/bASsFMIzqrRWFgwSubwYUwCdQzZ7DOPsJ2GZ1jsSaRZpjjbS+O0lmflgNZFUAx3KfFlF7SXRB5GxK7Inj9CAwfdqxqrIIgI5VTfOFRIZBDAFcL4KYwEOh9j8rgigEcAxvDIpP5TEh70bx3HPAmX+agYoAFjJi2KY3THJ0nindE+naSCuIlgC26Y2SHBGRBkR2Rknto+XOJQC53DbcR0EeIEkR2RHp4JPlcVYAOEb3NqE6ngkJ7Ah18Gkr8nYA5iGqu6hwICtHCtmqdXBycbzlAMq2PJ9gN4B3wth/sqh27QJk/o7hjUNxSATHI+33FQKYZvd9FVa+BOR0GM9tXlzziynBBZ+NjmNZswDW1lPpTZLgu+a7JRlwTO8IyH6R9OVI115b7fp0koE8C5b7DKD2QeRwqIP7WwEYtln9F5BKpBsbgZk/OgDI+kCSX9dyOxXG/qYVAIbhbe1SPCGCXyLt31QWZ1kGYJvui6RaNWsQOSeQwUjXJlcA2Ib7CJV6T0QmIx0MdApQpi9tRJblDSlwHKnsD5Mgb0CrmW1WNQkjjNP1QO3PMn0pQNZ2AfUmUhkLk2B3WUDbqn5N4PYy3fL3ApmO4noPMHtuodfMSyyj+phSmGi7BPCuFYsTENyZZaITEEnxcJT4Hy4ByDogVOVbiPwU6uCWTgK2q3XM6vcgetBAX1j3m9226b7hCtt0zgOiIi3XXEpdWwNtWOtYzhkR1CPtOwDqSzKQNwvT+xzk9hQYjGP/7XZ31o6ueU0FOBrF/t0rrmF+DiyvX4FHBDIbxUE2gCTtBC/XXGjFKXBPHPtftQRYyMIUyF6R9KVI114vD16usMzqG4p4FiInF85XPsysKEH2h2F0b6mwciI7C0jTO6L69LHyJYoVVpd7FxWPZnNJQ6QnSWo/LlYXDSQPkvxYBH8jbdx7sRC24Q6A6n0SZtEHrngkM73nQe7NpiKSw2HsjzVPbnlG1q2xzSvfIrkz0wpkIoqDx1v5rT6Umu4DAjU5vwP5DcBopINDxYfTvdqxMCDgEwSvE4Em8Eqo/X05RwsrHcsty72Boj4gcVvuL3IW4DcQmRHifH6QyKsg6BPIFpJqQXc4JV6I4yADL7RSgKanabrbK+AIyJuLw8lfAnwhkP1xXPu1vFT53NmZGYbbWyE3E9gkgE3KHIS/Q9JamExPFaW6aJWOATrDLVdfdoD/ABKl7jC6Uj6xAAAAAElFTkSuQmCC';
            } else if (data[i].type === 'list') {
              data[i].url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABYElEQVRYR+2Xz0rDQBDGv0klm72K/aNQlW5vfQHxJbx5U+hBfAYfwKfQgx4Ej76E4NmTl5S2CPVP0eMmS9KRKpUYaikkYQWzx12Y78e3M8MMwfIhy/pIAWw3pOucAdgF0WrOcGMw32kzOQL6T7PYCYB2VYrJPUCNnIVT4Xikw6gDDN+nD98AnqsuiXAIxk2M+MSY/kOeIK7b7lTApyDsMfNFYHrdHwBSqFcAazpEHfBf8hSfxZJQTQgMAYx16FeTACSFmkwvdOgXmZifOszMgek5JcDfdKCI5EvHXJgD1gEWVIEjhYqT9CnYZSopUxWUAKUD/8QB633AOkDZiEoHbDkAKVrPANV0GG0Ag9GcasjciCRamxA0APCoQ785dyxn5uvA9A4ARCmIrAArnquuiLA/dywHVE0Kni4m9WJ7wS+LyZfo1rrnVs4J2Ml9NWN+A3CrTXyc/OIid4CljLQO8AG1l+YwaRIxwgAAAABJRU5ErkJggg==';
            } else if (data[i].type === 'text') {
              data[i].url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB/UlEQVRYR+2VMWsUQRTH/2/vdmY2X8BGhOzmU9gImqAognZWwUasBBsLsbSxEISUqVQOCy0iGCOIoFUam9Th9gzBRuxOZWcmxz7ZHDHLuXs3d9kxKZxyYeb3e/N/+4ZwzIuOmY//Aj5vIFQi6QDoaps+qIvak8DpSEnxhkAXCnDOeGxseq9KwotAJJMVAHfKwDoJLwIKZ2KS7U2ATpUlmPmRtr375W9NCpASyUMmfm5Mb7tSgnk9s72rPgQK+FMiLAP8jc3grMZuryzBwDtt6DrQNU0LlOAHRx9KSJksgHHb2LS4+sFoIx41AlIifkFEN/7u8EOJcdP2KAItJeJONXyIZMYzbdObPgRakYhfgYpMaxbzVmaDc0C337RAOxLxyybghdi0ERTw1yC6Mqbyz5kNFidVfrB/GgFH+I/zwPefrs+8q0AYiXhtcuXTwV0jCJWM3xJoqb7fsKlt/+I0lTtGsCCVzItXbQLcLAJfM9drd56EKpy/RUGwOr7y2eETI4hEsgbCtSoBBj5pYy7PWrlLBMWk6xPR3KjAEE6XRh+WRiOQ7fmloBW89wkfG0EUxk8Q0N3hTOdfBPrAnK/rPe4AO3qWaqv21M4BJZMNynk7Z94wgy8fAew1BXX+C3wAR890nYTeXP4IRDJhb5SKgzOT7rNPjsC/rP5ENeFv1KbXIZ3aA54AAAAASUVORK5CYII=';
            } else if (data[i].type === 'formname') {
              data[i].url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAC2UlEQVRYR+2XO2gUURSG/zOz80JRLESFGDczRAUbRYsEgyJbCGkEX2Aj+GgsYqNgI9grWASxUQgRRcGopDFWhqAghoCCRglkdxOLgCgYSMzM3Nm5RwaNLMnO7uxssjbeds7ju/+5594zZKLVhqHdBiNHhAwSLmZ89oR7AJj5ntClohmZuv0BhLcI5f3EgRT1BYhnwBCe8LoagSBTd0TIsisIiqNJAUzdXoCU3VCVq2C0NAIRKVAKGR1BUBirB4BkmHNL02Om4QyC2U4L0SjAGwAZS3cGGLwzDcRKAETCKaZu3wOwr16IlADOuIS8JkRxoKxsUay7APZ7otQJfPmRpKTpADLZg6Qoz0C0oVKSkPm4EIUnqwbwO3CLZWWMPYxQL09EqvogZL7YBIDK+zMNZ1IyX/kP8C8VGGbguu/nh1b5ECYJX9smVRsuDavr9jGF6DCAVnD0SNGIF+T7a6cHGgYwdecRwCcIGJLAuALazkA3iF97/twR4Nt8NZCGAEzNPgOi3pD5UPljZhh2uwJ6yYxhT+RPrx6AYRdY8k0/KN6qUJajCjDgibl11VRoQAF7vWXQrOu7G2MGEs3UnZ+QMueViq/iVEgNoGnZ3RlFfef6eYoLbhn2jASdq9aSqQAs3X4KUCsIexkYia0xo5PAEwAmXFE4BaC01DYVQDSSMeMysfxUq9VIUTeD8ND1ww3A1OyKAfwZyaKJqOoykc2SoRabALBti5mhHV4J78t32jQAy3B6AfQwc58nCmcXZWkagKm1nSdFuSOl7Cm/F2oCRK0SsrwgxNRgrXr+3ZVuLyw/A5vWWMbaeQm0+35+MrECltF2iZluEDDKRF4shOR+Lyj0Rd+jLlgOkDUtQ3XZL9kepouJASJDS8t2MFEOIC0OIGR+vvj3VBkAsPS2k64oPgbAdQEklb56CWJmxFptWG/yxRKs2EWUDsD5SIRdyX35q+sXtgIIlvr8AoDbUz+jlLE3AAAAAElFTkSuQmCC';
            } else if (data[i].type === 'barline') {
              data[i].url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACT0lEQVRYR+2XP2gUURDGv2//X1CwUURDvNuUFioW6SSgjYiNaEQxpDJgGbWw8PBSBARFAmKjnV0uFlqINgo2tmqhjbd3orGIYBfZ3Xd3O3L/YsDc3u3l8A7JVsu+mTe/983svPeIAT8ccHwMB4BlZc7q1JYh0XlflfL/UpW6Ao7l5kjeEpH5QBVz/QRwDPcEdTlcFa0AoKAUPwOFsBWjJ4AU9o/6+L7SBSgdazwgYbVsRaCEciYMi89r35IC1Ca8CUiOwAsoXvHhfYsDse3xkxQ5B/AiCbthK9f8sHgvIUB6r2NrSwSP/VmN+IAsBKp0B4DaDMQ00xMG9Qcgjq77VauTQeXLm64BbDtzWhM+BrkLgp+RSFYjZkBO1NcDeKhiNqh4r1tBUnDHxMJtkhcai5YPIA/VXv0wHAFW/C4A9o04dmqRwOVmoJdBiBnA+1FLn2NmLlHjXYB7GjGQF0qWwmlArpN0AFmViDeqiN4ZmvZeBJ8C5R3sWISmeeCIrhlPCLgiWINEV4Ny6dHfMu/eYVs7swTnSJgbiq0swGKo1uaB1V/AaMqxzLkI+jOlCh9jAWzbPUXhUxKGCN5ClacDfC3GFZuDMRe28ZDgcYG8QliZ7eTTNgWOkZ6krudFcD9Q3gKAqBW816bVzi/pb9hz02rX7P4vgLj0JFKgl4k67SmJAOI2p36PbVoD/Q4Sp842wLYCw6lAyspMgdoSJJryVWl54ybU77HErbiLc2Aik+ECSIS+VePmHaSuwHpetzppEv9mfQ3H1SwJeL9tB67Abz0I0z+Rn+ysAAAAAElFTkSuQmCC';
            } else if (data[i].type === 'map') {
              data[i].url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAgCAYAAACRpmGNAAAD/0lEQVRYR8WYW2gcVRjH///Z3TkzUmux9UJT0+xspKCoeCmC4qX2QbG1KFqj4IVQpIKgwVZfDG1RfBCtvqj4EKwUBbFIVVrBBwli+xKLhYKi2J1YmljBBkTBmXM2OZ9Mbt0kuzOT+4F9mfN9//9vvzkz53xDLMtYu8ZT/iECdwvwTayr2wCY6ShcDjZfBS8C3D/hPQ64FcBwPc+ywHmq0ptUrR5EIN/GWncAg0MT12cBF1wCjFwEnDk3n2q7bvkRB/yUZKGBzsCISFeB2CSCzXng6JXKT9Jx3oJIf2TCW+cKVyoFG4sO+/Lki+DnVDhPBR8AuI/g+glBC9midfh1HoOZMZet8EorHif5AJJfyhDI9w3hvFL5KTjcQfDO6fli7dNxrf/g3OCSrDUXe2rlmwR3NtMQoBrrantjOBUcI3h7w2TBIRjsilA9O1tAr9h2FwvOZwAvz6jasViHd9TD0XXL1xXIzSLYT7LpLRcRS+CLyJgngIEoD6TvlrcLnE9IlLLiRexrsenfwyQJ4KMAN4FYnZU45fEX2RubWg9w9o+0PN+tvAzijSzt0T9NvBTp8O0klr6qDABoyUpMnRf5W4g+K/Z9Y37/Cmhd5atipwhWAthA8rEsfRH5T4gOrcMjk+85vxS8A4ddWcl55wU4DZEWkn6OnL9E0AviFiv2IWP6T9XnUKnyBgfOLzmEFjZE5IfI2G3AiAOoIeC0nm4wuuh9t3ICxM0L656uJhadca36UVrUKJxXKu+g4/QsJdyEl4jENPrqCIPJ2p8yxl8X7cp37Z8gVy0loCSPJ7DdmPDzRr7jcG1Xeq4zSNJZSjgITkammiwnaQrnlYJOOvxwScHGzUTwemyq3SmVW3ep77q9IK9fDkAL2ap1eLTJmksur/M9Vx0g0bHUgMkJJNbhjEPGjP1TqeAFju2tjQ6Di8MtciIy4caUyl2YUirYQuC9+nPc4lBNLrxTkQlvyAU3HuQoFdxP8DmI3Jt2Spk3uODLyFQfnA3cZKyH1oCq1CWCK4Q4bi2Ok4wd2O48m3oW/LAdvqlWO3NyTnDNxF239ZoCSz9lmafOixyNTJi0hTNGnganqbbnBntJ7psP3FjVeM5Tzr5Yh8/Wa80LzneDPpAznrKcsOfF2l1JP6JU5XkKdsameu3CwRUrt6Egh7N6gnpDEQxT5N2o9s8e4Py/yZyvyrvFciiuhQcWDG5M6Kq1vuseAXEjBD9aykGt9ce+694jZNJlTbaVAnwnkGe0Dn+bVt1kTy9O/14yr9t6waDNU4rrte7/dappu/Jc6QbkFQs+bEz1cM5bPhq2QHBpli2rPVftjo15NW+nNqG26HCeCnogYGzCpIme8hUpq4r/A5+5cTC+KvmeAAAAAElFTkSuQmCC';
            }
          }
          this.optionlist = data;
          this.optionlist.sort(this.compare('ordercode'));
          this.total = res.data.total;
        }
      })
    },
    // editlist
    async Editlist(val) {
      editimg(val).then((res) => {
        if (res.status === 200) { }
      })
    },
    Addimg(val) {
      let obj = {
        label: '柱状图和折线图',
        ordercode: 10,
        type: 'barline',
        param: 'barline',
        url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAC3UlEQVRYR+2Xz2vUUBDHv5Psut0k+yM91IsghVrRyv6I2INe6kULigileOhBsAgi/gO99FIQKeLVQ/FSD/YgKAhi8eZFCrJvXWwr9GBBROzBZEuy262bjGQxtdSuDXa3BTWHwOPN5Pt5bzLz5hH2+aF91kfLAbR87bgtDiwCxGEW11IALVvri0j1ZwBrBLxkYLbuqi/sEq00g2kpQCCSzlcPg90BEJ0FMMhAR9lSjuIDfdkK0hYAX0Q9YR+MHsBdAg15TFJZxOPbhaUNACyn89WbRN4EGM/rwBsZNGAJ9dJ2YWgpQDJb6Zdkb4oYsutKo6slZS6dt6cBqWgJ5V7bAJJ93CnHKneYeYiIxs2Cch8gzxfUDeezV8eFckkttAGAKZWrjBLxbSJ64taUsdV5+hoIpTLVbkn2SqZQks3S8o9DoBt2hpmmQJDBPGoJ7e3WFfrZwOReKRe0yZaloX6SU+xVJggYYvCYJdSHYYvOrkOg56ojIG+SwTOWq46jRE6Yavc7m1AhSBprPRLXHwBgjyPXV4sdS7sVDvxDAaRz9lUmySkL5XFYYT3vfATh0IY945Mp1J/jHxNNAdJ55xqBjphCGQsrutlONxw2a0oM87SOHk6mExXLEqoUqhSn885TAvcy5BuWiL/ac4BUxjHKJaUYFJM9Bwgj2KgDnty5yXbZKsaXg/GuQrATgJbhrmjEWWKGaNgSJfy3VVCNPQFIZNd6ZcmdtYTa7Qsmc84pWeJps6Ad+1sAmPTs2hkmRIIVfau7i847rdHRtH0HUln7HEmYAVBqhBjoYtC8JdThPQHQDecigFtmQR1snOm56giTN2wJ9fJ/gH9jB5KGfV5iPGr2E/qdDpH3npnngkJE4KhZ0DJB1qQNZx3Mr/0jnIhkZvRbQo2FOox8n0SueloGRQOHutexsPmG0+iAiZRmpdi/okXY69rwJ2nFFrGFkAA7FePWzYdqSFon9+uXvgM+p/wwBYdmdAAAAABJRU5ErkJggg=='
      }
      addimg(obj).then((res) => {
        // console.log('add-res', res);
      })
    },
    del(id) {
      delimg(id).then((res) => {
        // console.log('del-res', res);
      })
    }
  },
  watch: {},
}
</script>
