(() => {
    const tbody = document.querySelector('#tbody');


    // ===============================VVV方法區VVV====================================

    // ============================查資料回來getAll ========================
    let dataaccount = 0;
    getEmployee();
    let EmployeeData = [];

    function getEmployee() {
        fetch("getAllEmployee")
            .then(function (response) {
                // 檢查 API 响應的狀態碼
                if (response.status !== 200) {
                    console.log('發生錯誤，狀態碼：' + response.status);
                    return;
                }

                // 解析 JSON 格式的數據
                response.json().then(function (data) {
                    // 在此處可以處理從 API 獲取的數據
                    EmployeeData = data;
                    console.log("這是員工資料", EmployeeData);
                    dataaccount = EmployeeData.length;
                    for (let i = 0; i < EmployeeData.length; i++) {
                        let row = EmployeeData[i];
                        const employeeId = row.employeeId;
                        const employeeName = row.employeeName;
                        const employeeBrithday = dateformat(new Date(row.employeeBrithday));
                        const employeeHireDate = dateformat(new Date(row.employeeHireDate));
                        const employeeIdCard = row.employeeIdCard;
                        const annualLeaveDays = row.annualLeaveDays;
                        const remainingAnnualLeaveDays = row.remainingAnnualLeaveDays;
                        const employeeGender = row.employeeGender;
                        const employeePosition = row.employeePosition;
                        const employeeSalary = row.employeeSalary;
                        const employeePhone = row.employeePhone;
                        const employeeEmail = row.employeeEmail;
                        const employeeAddress = row.employeeAddress;
                        const employeeStatus = row.employeeStatus === 0 ? "非在職" : "在職";
                        const employeeNotes = row.employeeNotes;
                        const enrollmentDate = dateformat(new Date(row.enrollmentDate));
                        const enrollmentPrice = row.enrollmentPrice;
                        const groupInsurance = row.groupInsurance;
                        const nguyenVanA = row.nguyenVanA;

                        dataTable.row.add([
                            employeeName,
                            employeeIdCard,
                            remainingAnnualLeaveDays,
                            employeePosition,
                            employeeSalary,
                            employeePhone,
                            employeeStatus,
                            `
            <button type="button" class="btn btn-primary"  data-bs-toggle="modal"
                    data-bs-target="#exampleModal${i}" data-bs-whatever="@mdo" id="editbutton${i}"  >修改</button>
         <div class="modal fade" id="exampleModal${i}" tabIndex="1"
         aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel${i}">研磨明細修改
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label For="employeeId${i}"
                                   class="col-form-label">編號:</label>
                            <input type="text" class="form-control" id="employeeId${i}" value="${employeeId}" readonly>
                        </div>
                        <div class="mb-3">
                            <label For="employeeName${i}"
                                   class="col-form-label">姓名:</label>
                            <input type="text" class="form-control" id="employeeName${i}" value="${employeeName}">
                        </div>
                        <div class="mb-3">
                            <label For="nguyenVanA${i}"
                                   class="col-form-label">越南姓名:</label>
                            <input type="text" class="form-control" id="nguyenVanA${i}" value="${nguyenVanA}">
                        </div>
                       <div class="mb-3">
                            <label For="employeeBrithday${i}"
                                   class="col-form-label">生日:</label>
                            <input type="date" class="form-control" id="employeeBrithday${i}" value="${employeeBrithday}">
                        </div>
                         <div class="mb-3">
                            <label For="employeeHireDate${i}"
                                   class="col-form-label">入職日:</label>
                            <input type="date" class="form-control" id="employeeHireDate${i}" value="${employeeHireDate}">
                        </div>
                         <div class="mb-3">
                            <label For="employeeIdCard${i}"
                                   class="col-form-label">身分證:</label>
                            <input type="text" class="form-control" id="employeeIdCard${i}" value="${employeeIdCard}">
                        </div>
                         <div class="mb-3">
                            <label For="annualLeaveDays${i}"
                                   class="col-form-label">特休:</label>
                            <input type="text" class="form-control" id="annualLeaveDays${i}" value="${annualLeaveDays}">
                        </div>
                         <div class="mb-3">
                            <label For="remainingAnnualLeaveDays${i}"
                                   class="col-form-label">剩餘特休:</label>
                            <input type="text" class="form-control" id="remainingAnnualLeaveDays${i}" value="${remainingAnnualLeaveDays}">
                        </div>
                         <div class="mb-3">
                          <label for="employeeGender${i}"
                                  class="col-form-label">性別:</label>
                                            <select id="employeeGender${i}">
                                                <option value="">請選擇</option>
                                                <option value="1">男</option>
                                                <option value="0">女</option>
                                            </select>
                        </div>
                         <div class="mb-3">
                            <label For="employeePosition${i}"
                                   class="col-form-label">職稱:</label>
                            <input type="text" class="form-control" id="employeePosition${i}" value="${employeePosition}">
                        </div>
                         <div class="mb-3">
                            <label For="employeeSalary${i}"
                                   class="col-form-label">薪水:</label>
                            <input type="text" class="form-control" id="employeeSalary${i}" value="${employeeSalary}">
                        </div>
                         <div class="mb-3">
                            <label For="employeePhone${i}"
                                   class="col-form-label">電話:</label>
                            <input type="text" class="form-control" id="employeePhone${i}" value="${employeePhone}">
                        </div>
                         <div class="mb-3">
                            <label For="employeeEmail${i}"
                                   class="col-form-label">Email:</label>
                            <input type="text" class="form-control" id="employeeEmail${i}" value="${employeeEmail}">
                        </div>
                         <div class="mb-3">
                            <label For="employeeAddress${i}"
                                   class="col-form-label">地址:</label>
                            <input type="text" class="form-control" id="employeeAddress${i}" value="${employeeAddress}">
                        </div>
                         <div class="mb-3">
                            <label For="employeeStatus${i}"
                                   class="col-form-label">狀態:</label>
                                     <select id="employeeStatus${i}">
                                                <option value="">請選擇</option>
                                                <option value="1">在職</option>
                                                <option value="0">非在職</option>
                                     </select>
                        </div>
                         <div class="mb-3">
                            <label For="enrollmentDate${i}"
                                   class="col-form-label">加保日:</label>
                            <input type="date" class="form-control" id="enrollmentDate${i}" value="${enrollmentDate}">
                        </div>
                         <div class="mb-3">
                            <label For="enrollmentPrice${i}"
                                   class="col-form-label">投保金額:</label>
                            <input type="text" class="form-control" id="enrollmentPrice${i}" value="${enrollmentPrice}">
                        </div>
                         <div class="mb-3">
                            <label For="groupInsurance${i}"
                                   class="col-form-label">團體保險:</label>
                                     <select id="groupInsurance${i}">
                                                <option value="">請選擇</option>
                                                <option value="1">有投保</option>
                                                <option value="0">未投保</option>
                                     </select>
                        </div>
                         <div class="mb-3">
                            <label For="employeeNotes${i}"
                                   class="col-form-label">備註:</label>
                            <input type="text" class="form-control" id="employeeNotes${i}" value="${employeeNotes}">
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
    `,
                            `<button type="button" class="btn btn-primary" id="delete${i}">刪除</button>`]);

                    }
                    dataTable.draw();
                    seteditbutton();
                    setdeletebutton();
                    selected4edit();
                    reloadscroll();
                });
            })
            .catch(function (err) {
                console.log('錯誤：', err);
            });
    }


    // ============================  初始化datatable函式========================

    let dataTable = $('#all').DataTable({
        // scrollY: '600px',
        scrollCollapse: false,
        paging: false,
        pageLength: 15,
        info: false,
        destroy: true,
    });

    function reloadscroll() {
        window.addEventListener('load', function () {
            // 从本地存储中检索滚动位置
            let savedScrollPosition = localStorage.getItem('scrollPosition');
            // 将页面滚动到保存的位置
            window.scrollTo(0, savedScrollPosition);
        });
    };

//自動選好修改內的select
    function selected4edit() {
        for (let i = 0; i < dataaccount; i++) {
            const employeeGenderselect = $(`#employeeGender${i}`);
            const employeeStatusselect = $(`#employeeStatus${i}`);
            const groupInsuranceselect = $(`#groupInsurance${i}`);
            let row = EmployeeData[i];
            const employeeGender = row.employeeGender;
            const employeeStatus = row.employeeStatus;
            const groupInsurance = row.groupInsurance;
            employeeGenderselect.val(employeeGender).trigger('change.select2');
            employeeStatusselect.val(employeeStatus).trigger('change.select2');
            groupInsuranceselect.val(groupInsurance).trigger('change.select2');
        }
    }

    // ============================ 修改資料進去 editOrder()========================
    function editOrder(i) {
        const employeeId = document.getElementById(`employeeId${i}`).value;
        const employeeName = document.getElementById(`employeeName${i}`).value;
        const employeeBrithday = document.getElementById(`employeeBrithday${i}`).value;
        const employeeHireDate = document.getElementById(`employeeHireDate${i}`).value;
        const employeeIdCard = document.getElementById(`employeeIdCard${i}`).value;
        const annualLeaveDays = document.getElementById(`annualLeaveDays${i}`).value;
        const remainingAnnualLeaveDays = document.getElementById(`remainingAnnualLeaveDays${i}`).value;
        const employeeGender = document.getElementById(`employeeGender${i}`).value;
        const employeePosition = document.getElementById(`employeePosition${i}`).value;
        const employeeSalary = document.getElementById(`employeeSalary${i}`).value;
        const employeePhone = document.getElementById(`employeePhone${i}`).value;
        const employeeEmail = document.getElementById(`employeeEmail${i}`).value;
        const employeeAddress = document.getElementById(`employeeAddress${i}`).value;
        const employeeStatus = document.getElementById(`employeeStatus${i}`).value;
        const employeeNotes = document.getElementById(`employeeNotes${i}`).value;
        const enrollmentDate = document.getElementById(`enrollmentDate${i}`).value;
        const enrollmentPrice = document.getElementById(`enrollmentPrice${i}`).value;
        const groupInsurance = document.getElementById(`groupInsurance${i}`).value;
        const nguyenVanA = document.getElementById(`nguyenVanA${i}`).value;

        // if (customerId === '') {
        //     return;
        // }
        // 檢查結束

        fetch('editEmployee', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                employeeId: employeeId,
                employeeName: employeeName,
                employeeBrithday: employeeBrithday,
                employeeHireDate: employeeHireDate,
                employeeIdCard: employeeIdCard,
                annualLeaveDays: annualLeaveDays,
                remainingAnnualLeaveDays: remainingAnnualLeaveDays,
                employeeGender: employeeGender,
                employeePosition: employeePosition,
                employeeSalary: employeeSalary,
                employeePhone: employeePhone,
                employeeEmail: employeeEmail,
                employeeAddress: employeeAddress,
                employeeStatus: employeeStatus,
                employeeNotes: employeeNotes,
                enrollmentDate: enrollmentDate,
                enrollmentPrice: enrollmentPrice,
                groupInsurance: groupInsurance,
                nguyenVanA: nguyenVanA,
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
                        let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

                        localStorage.setItem('scrollPosition', scrollPosition);
                        location.reload();
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
        const employeeName = document.querySelector('#employeeName4new').value;
        const employeeBrithday = document.querySelector('#employeeBrithday4new').value;
        const employeeHireDate = document.querySelector('#employeeHireDate4new').value;
        const employeeIdCard = document.querySelector('#employeeIdCard4new').value;
        const annualLeaveDays = document.querySelector('#annualLeaveDays4new').value;
        const remainingAnnualLeaveDays = document.querySelector('#remainingAnnualLeaveDays4new').value;
        const employeeGender = document.querySelector('#employeeGender4new').value;
        const employeePosition = document.querySelector('#employeePosition4new').value;
        const employeeSalary = document.querySelector('#employeeSalary4new').value;
        const employeePhone = document.querySelector('#employeePhone4new').value;
        const employeeEmail = document.querySelector('#employeeEmail4new').value;
        const employeeAddress = document.querySelector('#employeeAddress4new').value;
        const employeeStatus = document.querySelector('#employeeStatus4new').value;
        const employeeNotes = document.querySelector('#employeeNotes4new').value;
        const enrollmentDate = document.querySelector('#enrollmentDate4new').value;
        const enrollmentPrice = document.querySelector('#enrollmentPrice4new').value;
        const groupInsurance = document.querySelector('#groupInsurance4new').value;
        const nguyenVanA = document.querySelector('#nguyenVanA4new').value;


        fetch('newEmployee', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                employeeName: employeeName,
                employeeBrithday: employeeBrithday,
                employeeHireDate: employeeHireDate,
                employeeIdCard: employeeIdCard,
                annualLeaveDays: annualLeaveDays,
                remainingAnnualLeaveDays: remainingAnnualLeaveDays,
                employeeGender: employeeGender,
                employeePosition: employeePosition,
                employeeSalary: employeeSalary,
                employeePhone: employeePhone,
                employeeEmail: employeeEmail,
                employeeAddress: employeeAddress,
                employeeStatus: employeeStatus,
                employeeNotes: employeeNotes,
                enrollmentDate: enrollmentDate,
                enrollmentPrice: enrollmentPrice,
                groupInsurance: groupInsurance,
                nguyenVanA: nguyenVanA,
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
                        let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

                        localStorage.setItem('scrollPosition', scrollPosition);
                        location.reload();
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
            const employeeId = EmployeeData[i].employeeId;
            const deletebutton = document.getElementById('delete' + i);
            deletebutton?.addEventListener('click', () => {
                console.log('第' + i + '個的ｉｄ:' + employeeId)
                deledtbyPK(employeeId);
            })
        }
    }

    // ============================9. 刪除方法========================
    function deledtbyPK(employeeId) {
        const confirmed = confirm("確定要刪除嗎？");
        console.log(employeeId)
        if (confirmed) {
            fetch('deleteEmployee', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify(employeeId),
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
                            let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

                            localStorage.setItem('scrollPosition', scrollPosition);
                            location.reload();
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