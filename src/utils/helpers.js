export default (list) => [...list]
  .sort((a, b) => {
    if (a.nirScaleID > b.nirScaleID) {
      return 1;
    } if (a.nirScaleID < b.nirScaleID) {
      return -1;
    }
    return 0;
  })
  .sort((a, b) => {
    if (a.nirInnovationPropertyID > b.nirInnovationPropertyID) {
      return 1;
    } if (a.nirInnovationPropertyID < b.nirInnovationPropertyID) {
      return -1;
    }
    return 0;
  });
