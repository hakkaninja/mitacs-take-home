import Fuse from "fuse.js";

export const filterData = (list, city, provinceTerritory, keyword) => {
  if (keyword) {
    const fuse = new Fuse(list, {
      keys: ["value.name"],
      shouldSort: true,
      isCaseSensitive: false,
      includeScore: false,
      threshold: 0.4,
      findAllMatches: true,
    });
    list = fuse.search(keyword).map((result) => {
      return {
        ...result.item,
      };
    });
  }
  const filter = {};
  if (city) {
    filter["city"] = city;
  }
  if (provinceTerritory) {
    filter["province_territory"] = provinceTerritory;
  }
  list = list.filter((item) => {
    return Object.keys(filter).every((key) => {
      return filter[key] === item.value[key];
    });
  });
  return list;
};

export default filterData;
