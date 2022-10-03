<template>
  <div class="row q-ma-0">
    <div class="col data-card">
      <div class="title">Proteínas</div>
      <div class="bottom">
        <div class="details"><span>80,0</span><span>/107,0</span></div>
        <div class="info">
          <q-icon name="fa-solid fa-arrow-up" color="negative" size="14px" />
          27,0
        </div>
      </div>
    </div>
    <div class="col data-card">
      <div class="title">Lípidos</div>
      <div class="bottom">
        <div class="details"><span>55,4</span><span>/71,0</span></div>
        <div class="info">
          <q-icon name="fa-solid fa-arrow-up" color="negative" size="14px" />
          15,9
        </div>
      </div>
    </div>
    <div class="col data-card">
      <div class="title">Hidratos de Carbono</div>
      <div class="bottom">
        <div class="details"><span>277,0</span><span>/267,0</span></div>
        <div class="info">
          <q-icon name="fa-solid fa-arrow-down" color="negative" size="14px" />
          10,0
        </div>
      </div>
    </div>
    <div class="col data-card">
      <div class="title">Valor Energético</div>
      <div class="bottom">
        <div class="details"><span>1665</span><span>/2139</span></div>
        <div class="info">
          <q-icon name="fa-solid fa-arrow-up" color="negative" size="14px" />
          474
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.data-card {
  background: white;
  margin: 0 15px;
  height: 125px;
  box-shadow: 0 1px 2px rgb(0 0 0 / 10%), 0 1px 2px rgb(0 0 0 / 10%),
    0 3px 1px -2px rgb(0 0 0 / 12%);
  padding: 15px;
  position: relative;
}
.data-card:first-child {
  margin: 0;
  margin-right: 15px;
}

.data-card:last-child {
  margin: 0;
  margin-left: 15px;
}

.data-card .title {
  color: #646464;
  font-size: 15px;
}

.data-card .bottom {
  position: absolute;
  bottom: 15px;
}

.data-card .details span:first-child {
  font-size: 25px;
  color: #b9b9b9;
  font-weight: bold;
}
.data-card .details span:last-child {
  font-size: 25px;
  color: #646464;
  font-weight: bold;
}
.data-card .info {
  color: var(--q-negative);
  font-weight: bold;
}
</style>
