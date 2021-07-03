import Delete from './Delete';
import Get from './Get';
import Post from './Post';
import Put from './Put';

//POST
const postKaryawanData = (data) => Post('data-karyawan', false, data);

//PUT
const updateKaryawanData = (data, id) => Put('data-karyawan/'+ id, false, data);

// GET
const getKaryawanData = () => Get('data-karyawan?_sort=id&_order=desc', false);

// DELETE
const deleteKaryawanData = (id) => Delete('data-karyawan/'+ id, false);

const API = {
    postKaryawanData,
    updateKaryawanData,
    getKaryawanData,
    deleteKaryawanData
}

export default API;

