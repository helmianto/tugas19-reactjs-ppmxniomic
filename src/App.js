import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Segment, Grid, Input, Table, Container, Select, Form, Button } from 'semantic-ui-react';
import API from './services'

// Mau menggunakan select option tapi masih bingung akses data option data untuk dimasukkan ke state
const options = [
  { key: 'pilih', text: '-- Pilih Jenis Kelamin --', value: 'pilih' },
  { key: 'laki-laki', text: 'Laki-Laki', value: 'laki-laki' },
  { key: 'perempuan', text: 'Perempuan', value: 'perempuan' },
]

class App extends Component {
  state ={
    karyawan: [],
    formKaryawan: {
        id: 1,
        nama_karyawan: '',
        jabatan: '',
        jenis_kelamin: 'pilih',
        tanggal_lahir: ''
    },
    isUpdate: false
  }

  getPostAPI = () => {
      API.getKaryawanData().then(result => {
          console.log(result, 'Karyawan Data');
          this.setState ({
            karyawan: result
          })
      })
  }

  postDataToAPI = () => {
    API.postKaryawanData(this.state.formKaryawan).then((res) => {
        this.getPostAPI();
        this.setState({
            formKaryawan: {
              id: 1,
              nama_karyawan: '',
              jabatan: '',
              jenis_kelamin: 'pilih',
              tanggal_lahir: ''
            }
        })
    });
  }

  putDataToAPi = () => {
    API.updateKaryawanData(this.state.formKaryawan, this.state.formKaryawan.id)
    .then((res) => {
        this.getPostAPI();
        this.setState({
            isUpdate: false,
            formKaryawan: {
              id: 1,
              nama_karyawan: '',
              jabatan: '',
              jenis_kelamin: 'pilih',
              tanggal_lahir: ''
            }
        })
    })
  }

  handleRemove = (id) => {
    API.deleteKaryawanData(id).then((res) => {
        this.getPostAPI();
    })
  }

  handleUpdate = (data) => {
    console.log(data);
    this.setState({
        formKaryawan: data,
        isUpdate: true
    })
  }

  handleFormChange = (event) => {
    // console.log(event.target);
    let formKaryawanNew = {...this.state.formKaryawan};
    let timestamp = new Date().getTime();
    if(!this.state.isUpdate) formKaryawanNew['id'] = timestamp;
    formKaryawanNew[event.target.name] = event.target.value;
    this.setState ({
      formKaryawan: formKaryawanNew
    })
  }

  handleOptionChange = (event, data) => {
    console.log(data.value);
    let formKaryawanNew = {...this.state.formKaryawan};
    let timestamp = new Date().getTime();
    if(!this.state.isUpdate) formKaryawanNew['id'] = timestamp;
    formKaryawanNew['jenis_kelamin'] = data.value;
    this.setState ({
      formKaryawan: formKaryawanNew
    })
  }

  handleSubmit = () => {
      if(this.state.isUpdate) {
        this.putDataToAPi();
      } else {
        this.postDataToAPI();
      }
  }

  componentDidMount(){
      this.getPostAPI()
  }

  render(){
    return (
      <div>
        <br />
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={6}>
              <Segment textAlign='center' color='teal'>
                  <h4>Form Input Data Karyawan</h4>                 
                </Segment>
                <Segment>
                  <Form >
                    <Form.Field>
                      <Input onChange={this.handleFormChange} value={this.state.formKaryawan.nama_karyawan} name="nama_karyawan" icon='user' type='text' iconPosition='left' placeholder='Nama Karyawan' />
                    </Form.Field>
                    <Form.Field>
                      <Input onChange={this.handleFormChange} value={this.state.formKaryawan.jabatan} name="jabatan" icon='sitemap' type='text' iconPosition='left' placeholder='Jabatan' />
                    </Form.Field>
                    <Form.Field>
                      {/* <Input onChange={this.handleFormChange} value={this.state.formKaryawan.jenis_kelamin} name="jenis_kelamin" icon='address card' type='text' iconPosition='left' placeholder='Jenis Kelamin' /> */}
                      <Select compact options={options} onChange={this.handleOptionChange} value={this.state.formKaryawan.jenis_kelamin} defaultValue={this.state.formKaryawan.jenis_kelamin} />
                    </Form.Field>
                    <Form.Field>
                      <Input onChange={this.handleFormChange} value={this.state.formKaryawan.tanggal_lahir} name="tanggal_lahir" icon='calendar' type='date' iconPosition='left' placeholder='Tanggal Lahir' />
                    </Form.Field>
                    <Button onClick={this.handleSubmit} color='teal' fluid>Input</Button>
                  </Form>                  
                </Segment>
              </Grid.Column>
              <Grid.Column width={5}></Grid.Column>
              <Grid.Column width={5}></Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
        <br />
        <Container>
          <Segment textAlign='center' color='teal'>
            <h4>Tabel Data Karyawan</h4>
          </Segment>
          <Table celled>
            <Table.Header>
              <Table.Row textAlign='center'>
                <Table.HeaderCell>Nama Karyawan</Table.HeaderCell>
                <Table.HeaderCell>Jabatan</Table.HeaderCell>
                <Table.HeaderCell>Jenis Kelamin</Table.HeaderCell>
                <Table.HeaderCell>Tanggal Lahir</Table.HeaderCell>
                <Table.HeaderCell>Aksi</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                this.state.karyawan.map(data => {
                  return (
                    <Table.Row>
                      <Table.Cell>
                        {data.nama_karyawan}
                      </Table.Cell>
                      <Table.Cell>{data.jabatan}</Table.Cell>
                      <Table.Cell>
                        {data.jenis_kelamin}
                      </Table.Cell>
                      <Table.Cell>
                        {data.tanggal_lahir}
                      </Table.Cell>
                      <Table.Cell textAlign='center'>
                        <Button primary onClick={() => this.handleUpdate(data)}>Edit</Button>
                        <Button color='red' onClick={() => this.handleRemove(data.id)}>Hapus</Button>
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              }              
            </Table.Body>
          </Table>
        </Container>
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default App;
