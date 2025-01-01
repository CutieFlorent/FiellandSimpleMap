const archlaData = {};

Object.values(regionData).forEach((item) => {
  const { archla, population, area } = item;

  // 如果 archla 不在 archla_data 中，初始化
  if (!archlaData[archla]) {
    archlaData[archla] = { population: 0, area: 0, density: 0 };
  }

  // 累加 population 和 area
  archlaData[archla].population += parseInt(population);
  archlaData[archla].area += parseInt(area);
});

// 计算 density
for (const archla in archlaData) {
  const data = archlaData[archla];
  data.density = data.area > 0 ? data.population / data.area : 0; // 避免面积为0时除以0的错误
}
