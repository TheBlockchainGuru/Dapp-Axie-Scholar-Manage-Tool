import React, {Component, useState} from 'react';
import { InputGroup, FormControl, Button, Modal} from 'react-bootstrap';
import { MDBDataTableV5 } from 'mdbreact';
import { database } from './firebase/firebase';


class WalletList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            prevAddress : '',
            newAddress : '',
            prevScholaName : '',
            newScholaName : '',
            editKey: '',
            walletLists : [],
            show : false,
        }


        this.closeModal = e =>{
          this.setState({
            show: false
          });
        }
    }

    async componentWillMount() {
      await this.Init()
    }

    async Init(){
        database.ref('RoninWallet/').get().then((snapshot) => {
            if (snapshot.exists) {
              var walletList = [];
                const newArray = snapshot.val();
                if (newArray) {
                    Object.keys(newArray).map( (key, index) => {
                        const value = newArray[key];
                        walletList.push({
                            id: index+1,
                            key,
                            address : value.address,
                            scholaName : value.scholaName,
                        })
                    })
                }
                this.setState({
                walletLists : walletList
              })
            }
        });
    }

    onReload = () => {
      this.Init()
    }

    closeModal(){
      console.log("close")
    }

    deleteWalletList(id){
      console.log(id)
      database.ref('RoninWallet/' + id).remove();
      this.Init(); 
    }

    saveWallet(){
        if(this.state.newAddress==''){
          alert("input date")
          return
        }

        const load = {
          address : this.state.newAddress,
          scholaName : this.state.newScholaName,
        }

        var updates = {}
        updates['RoninWallet/'+ this.state.editKey] = load;
        database.ref().update(updates).then(function(){
          alert("Data saved successfully.");
        }).catch(function(error) {
          alert("Data could not be saved." + error);
        });
        this.setState({
          show : false
        })
        this.Init();
    }
    render () {

      const rows = this.state.walletLists.map((walletList) => {
        walletList.Actions =  <div>
                                   <Button variant="outline-danger"  size = "sm" onClick= {()=>this.deleteWalletList(walletList.key)}> Delete</Button>{' '}
                              </div>
        return walletList
      })
          const data = {
            columns: [
              {
                label: 'No',
                field: 'id',
                sort: 'asc',
                width: 150
              },
              {
                label: 'Schola Name',
                field: 'scholaName',
                sort: 'asc',
                width: 200
              },
              {
                label: 'Ronin Address',
                field: 'address',
                sort: 'asc',
                width: 270
              },
              {
                label: 'Delete',
                field: 'Actions',
                sort: 'asc',
                width: 100
              }
            ],
            rows : rows
          };
        return (
            <div>
                <h2>Wallet List</h2>
                <hr/><br/><br/>
                <Example onReload={this.onReload} walletData = {this.state.walletLists}/>
                <br/><br/>
                <MDBDataTableV5 hover entriesOptions={[10,20,50,100,200,500,1000]} entries={50} pagesAmount={10} data={data} materialSearch/><br/><br/>
            </div>
        );
    }
  }
export default WalletList;






function Example(props) {

  var  addAddress    = ''
  var  addScholaName = ''


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow  =  () => setShow(true);




  const addwallet   =   async () =>{
    setShow(false)
    if(addAddress === ""){
      alert("Please check Address")
      return
    }
    else {
        const walletList= {
        address    : addAddress,
        scholaName : addScholaName,
        }

        var userListRef = database.ref("RoninWallet")
        var newUserRef = userListRef.push();
        newUserRef.set(walletList);
        props.onReload();
        }
    }
  
  const handleAddress = async (e) => {
    addAddress  = e.target.value
  }

  const handleScholarName = async (e) => {
    addScholaName  = e.target.value
  }

  

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Wallet
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Ronon  Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>


        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon3">
            Schola Name
          </InputGroup.Text>
          <FormControl id="basic-url1" aria-describedby="basic-addon3"  type="text" 
          placeholder="Schola name" defaultValue={addScholaName} onChange={handleScholarName} />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon3">
            Ronin Address
          </InputGroup.Text>
          <FormControl id="basic-url1" aria-describedby="basic-addon3"  type="text" 
          placeholder="ronin:..." defaultValue={addAddress} onChange={handleAddress} />
        </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary"   onClick={addwallet}>
            Add wallet
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}



