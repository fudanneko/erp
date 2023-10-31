(() => {
    const tbody = document.querySelector('#tbody');


    // ===============================VVV方法區VVV====================================

    // ============================查資料回來getAll ========================
    let dataaccount = 0;
    getSteelPrice();
    let SteelPriceData = [];

    function getSteelPrice() {
        fetch("getAllSteelPrice")
            .then(function (response) {
                // 檢查 API 响應的狀態碼
                if (response.status !== 200) {
                    console.log('發生錯誤，狀態碼：' + response.status);
                    return;
                }

                // 解析 JSON 格式的數據
                response.json().then(function (data) {
                    // 在此處可以處理從 API 獲取的數據
                    SteelPriceData = data;
                    console.log("這是金屬價格資料", SteelPriceData);
                    dataaccount = SteelPriceData.length;
                    console.log(dataaccount)
                    for (let i = 0; i < SteelPriceData.length; i++) {
                        let row = SteelPriceData[i];
                        const steelId = row.steelId;
                        const steelType = row.steelType;
                        const steelMaterial = row.steelMaterial;
                        const steelMinSize = row.steelMinSize;
                        const steelMaxSize = row.steelMaxSize;
                        const steelUnitPrice = row.steelUnitPrice;

                        dataTable.row.add([
                            steelType,
                            steelMaterial,
                            steelMinSize,
                            steelMaxSize,
                            steelUnitPrice,
                            `
            <button type="button" class="btn btn-primary"  data-bs-toggle="modal"
                    data-bs-target="#exampleModal${i}" data-bs-whatever="@mdo" id="editbutton${i}"  >修改</button>
         <div class="modal fade" id="exampleModal${i}" tabIndex="1"
         aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel${i}">明細修改
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                     <div class="mb-3">
                                            <label for="steelId${i}"
                                                   class="col-form-label">編號:</label>
                                            <input type="text" class="form-control" id="steelId${i}" value="${steelId}">
                                        </div>
                       <div class="mb-3">
                                            <label for="steelType${i}" class="col-form-label">種類:</label>
                                            <select name="" id="steelType${i}" class="select24datatable "
                                                    style="width: 300px">
                                                <option value="圓型">圓型</option>
                                                <option value="方型">方型</option>
                                            </select>
                                        </div>
                                        <div class="mb-3">
                                            <label for="steelMaterial${i}" class="col-form-label">材質:</label>
                                            <select name="" id="steelMaterial${i}" class="select24datatable "
                                                    style="width: 300px">
                                                <option value="中碳鋼(S45C)">中碳鋼(S45C)</option>
                                                <option value="中碳鋼(S50C)">中碳鋼(S50C)</option>
                                                <option value="紅十字(SCM440)">紅十字(SCM440)</option>
                                                <option value="白十字(SNCM220)">白十字(SNCM220)</option>
                                                <option value="模具鋼(K105)">模具鋼(K105)</option>
                                                <option value="高強度模具鋼(K340)">高強度模具鋼(K340)</option>
                                                 <option value="高鉻模具鋼(K110)">高鉻模具鋼(K110)</option>
                                                <option value="特殊鋼(DC53)">特殊鋼(DC53)</option>
                                                <option value="高速鋼(S600)">高速鋼(S600)</option>
                                                <option value="高碳鉻合金鋼(SKD11)">高碳鉻合金鋼(SKD11)</option>
                                                <option value="工具鋼(SKD61)">工具鋼(SKD61)</option>
                                                <option value="高速工具鋼(SKS93)">高速工具鋼(SKS93)</option>
                                                <option value="鎳鉻鉬合金鋼(SNCM439)">鎳鉻鉬合金鋼(SNCM439)</option>
                                                <option value="耐磨鋼板(SAE1345)">耐磨鋼板(SAE1345)</option>
                                                <option value="合金鋼(QC11)">合金鋼(QC11)</option>
                                               
                                            </select>
                                        </div>

                                        <div class="mb-3">
                                            <label for="steelMinSize${i}"
                                                   class="col-form-label">最低尺寸:</label>
                                            <input type="text" class="form-control" id="steelMinSize${i}" value="${steelMinSize}">
                                        </div>
                                        <div class="mb-3">
                                            <label for="steelMaxSize${i}"
                                                   class="col-form-label">最高尺寸:</label>
                                            <input type="text" class="form-control" id="steelMaxSize${i}" value="${steelMaxSize}">
                                        </div>
                                        <div class="mb-3">
                                            <label for="steelUnitPrice${i}"
                                                   class="col-form-label">每公斤單價:</label>
                                            <input type="text" class="form-control" id="steelUnitPrice${i}" value="${steelUnitPrice}">
                                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <span id="msg"> </span>
                    <button type="button" class="btn btn-secondary editbutton"
                            data-bs-dismiss="modal" id="cancle${i}">取消
                    </button>
                    <button type="button" class="btn btn-primary" id="confirm${i}">修改</button>
                </div>
            </div>
        </div>
    </div>`,
                            `<button type="button" class="btn btn-primary" id="delete${i}">刪除</button>`]);

                    }
                    dataTable.draw();
                    seteditbutton();
                    setdeletebutton();
                    selected4edit();
                });
            })
            .catch(function (err) {
                console.log('錯誤：', err);
            });
    }


    // ============================  初始化datatable函式========================

    let dataTable = $('#all').DataTable({
        scrollY: '600px',
        scrollCollapse: true,
        paging: false,
        pageLength: 15,
        info: false,
        destroy: true,
    });

//自動選好修改內的select
    function selected4edit() {
        for (let i = 0; i < dataaccount; i++) {
            const steelMaterialselect = $(`#steelMaterial${i}`);
            const steelTypeselect = $(`#steelType${i}`);
            let row = SteelPriceData[i];
            const steelType = row.steelType;
            const steelMaterial = row.steelMaterial;
            steelTypeselect.val(steelType).trigger('change.select2');
            steelMaterialselect.val(steelMaterial).trigger('change.select2');
        }
    }

    // ============================ 修改資料進去 editOrder()========================
    function editOrder(i) {
        const steelId = document.getElementById(`steelId${i}`).value;
        const steelMaterial = document.getElementById(`steelMaterial${i}`).value;
        const steelType = document.getElementById(`steelType${i}`).value;
        const steelMinSize = document.getElementById(`steelMinSize${i}`).value;
        const steelMaxSize = document.getElementById(`steelMaxSize${i}`).value;
        const steelUnitPrice = document.getElementById(`steelUnitPrice${i}`).value;

        // if (customerId === '') {
        //     return;
        // }
        // 檢查結束

        fetch('editSteelPrice', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                steelId: steelId,
                steelMaterial: steelMaterial,
                steelType: steelType,
                steelMinSize: steelMinSize,
                steelMaxSize: steelMaxSize,
                steelUnitPrice: steelUnitPrice,
            }),
        })
            .then(resp => resp.json())
            .then(body => {
                console.log(body);
                const {successful} = body;
                if (successful) {
                    Swal.fire({
                        position: 'center', icon: 'success', title: '修改成功!', showConfirmButton: false, timer: 1500
                    }).then(() => {
                        location.reload()
                    })
                } else {
                    Swal.fire({
                        icon: 'error', title: 'Oops...', text: '修改失敗!', footer: '<a href=""></a>'
                    })
                }
            });

    }

//
    // ============================ 抓取所有修改的燈箱’修改‘按鈕 並綁定事件 ========================

    function seteditbutton() {
        for (let i = 0; i < dataaccount; i++) {
            const editbuttons = document.getElementById('confirm' + i);
            editbuttons?.addEventListener('click', () => {
                console.log('修改按鈕啟動' + i)
                editOrder(i);
            })
        }
    }

//     // ============================   newOrder()新增訂單========================
    function newOrder() {
        const steelMaterial4new = document.querySelector('#steelMaterial4new').value;
        const steelType4new = document.querySelector('#steelType4new').value;
        const steelMinSize4new = document.querySelector('#steelMinSize4new').value;
        const steelMaxSize4new = document.querySelector('#steelMaxSize4new').value;
        const steelUnitPrice4new = document.querySelector('#steelUnitPrice4new').value;
        // if (heatTreatmentMaterial4new === '') {
        //     return;
        // }
        // if (heatTreatmentType4new === '') {
        //     return;
        // }
        // if (heatTreatmentUnitPrice4new === '') {
        //     return;
        // }

        fetch('newSteelPrice', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                steelMaterial: steelMaterial4new,
                steelType: steelType4new,
                steelMinSize: steelMinSize4new,
                steelMaxSize: steelMaxSize4new,
                steelUnitPrice: steelUnitPrice4new,
            }),
        })
            .then(resp => resp.json())
            .then(body => {
                console.log(body);
                const {successful, message} = body;
                if (successful) {

                    Swal.fire({
                        position: 'center', icon: 'success', title: '新增成功!', showConfirmButton: false, timer: 1500
                    }).then(() => {
                        location.reload()
                    })
                } else {
                    Swal.fire({
                        icon: 'error', title: 'Oops...', text: `${message}`, footer: '<a href=""></a>'
                    })
                }
                ;

            });

    };

    const newbutton = document.querySelector('#newbutton');
    newbutton.addEventListener('click', () => {
        newOrder();
    })
//

//
    // ============================7. 找到所有刪除按鈕並加上事件========================

    function setdeletebutton() {
        for (let i = 0; i < dataaccount; i++) {
            const steelId = SteelPriceData[i].steelId;
            const deletebutton = document.getElementById('delete' + i);
            deletebutton?.addEventListener('click', () => {
                console.log('第' + i + '個的ｉｄ:' + steelId)
                deledtbyPK(steelId);
            })
        }
    }

    // ============================9. 刪除方法========================
    function deledtbyPK(steelId) {
        const confirmed = confirm("確定要刪除嗎？");
        console.log(steelId)
        if (confirmed) {
            fetch('deleteSteelPrice', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify(steelId),
            })
                .then((resp) => {
                    if (resp) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: '刪除成功!',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            location.reload()
                        })
                    } else {
                        Swal.fire({
                            icon: 'error', title: 'Oops...', text: '刪除失敗!', footer: '<a href=""></a>'
                        })
                    }
                })
        }
    };

    // ===============================14日期轉換====================================
    function dateformat(date) {
        const formattedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        return formattedDate;
    }

    // ===============================詳情按鈕 資料寫入storage===================================

    // ===============================^^^方法區^^^====================================

    // ===============================VVV使用方法區VVV================================

    //=================================1. 總之先查一次=================================

    // ===============================2. 確認新增按鈕================================


//=================================3. 圖片檔案上傳按鈕=============================


    // ===============================^^^使用方法區^^^==============================

})();