// 4 ô vuông đầu
export const calculatePackingSummaryCards = (packingList = []) => {
    if (!packingList || packingList.length === 0) {
    return [
      { value: 0, label: "items packed" },
      { value: 0, label: "still needed" },
      { value: 0, label: "required unpacked" },
      { value: 0, label: "total items" }
    ];
  }
//  0. tổng số items yêu cầu
    const totalPackedItems = packingList.length

//   1.Tổng số item đã pack
    const packedItems = packingList.filter((item)=>(
        item.packedStatus.toLowerCase()=="packed"
    )).length
//   2. item cần thêm
    const neededItems = (totalPackedItems) - (packingList.filter((item)=>(
        item.packedStatus.toLowerCase()=="packed"
    )).length)
//   3. item có tag required mà chưa pack
    const requiredUnpackedItems = packingList.filter((item)=>(
        item.packedStatus.toLowerCase()=="not packed" && item.requiredStatus.toLowerCase()=="required"
    )).length

    return [
      { value: packedItems, label: "items packed" },
      { value: neededItems, label: "still needed" },
      { value: requiredUnpackedItems, label: "required unpacked" },
      { value: totalPackedItems, label: "total items" }
    ];

};

//Lấy các danh mục mà user nhập vào
export const getPackingCategories = (packingList = []) => {
    if(!packingList||packingList.length==0) return [];

    const categories = packingList.map((item)=>(
        item.category
    ))

    return [...new Set(categories)];
};

// logic chỗ tên danh mục + thanh tiến độ
export const calculatePackingCategoriesProgress = (packingList = []) => {
    // Thanh overall
    if(!packingList||packingList.length==0){
        return [
            {
                name: "Overall Progress",
                current: 0,
                total: 0,
                isPercent: true
            }
        ]
    }

    const totalItems = packingList.length;
    const itemsPacked = packingList.filter(item => item.packedStatus?.toLowerCase() === "packed").length;
    const overallPercent = totalItems > 0 ? Math.round((itemsPacked / totalItems) * 100) : 0;

    const uniqueCategories = getPackingCategories(packingList);

    const processedCategories = uniqueCategories.map(catName => {
    // Lọc ra danh sách đồ thuộc riêng nhóm này
    const itemsInCat = packingList.filter(item => item.category === catName);
    const total = itemsInCat.length;
    const current = itemsInCat.filter(item => item.packedStatus?.toLowerCase() === "packed").length;

    return {
      name: catName,
      current: current,
      total: total,
      isPercent: false // thêm thuộc tính này để chỉ mỗi cái thnah overall là hiện %, 
                      // còn mấy category kia thì hiện số
    };
  });

  return [
    { name: "Overall progress", current: overallPercent, total: overallPercent, isPercent: true },
    ...processedCategories
  ];

};

