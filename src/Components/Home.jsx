import React, { Component } from 'react';
import {Container, Row , Col , Card , Form} from "react-bootstrap"

import "../css/Home.css"
class Home extends Component {
    state = { 
        receiptDetails: [],
        id:"",
        postReceiptDetails: {
            quantity: "",
            price: "",
            date:"",
        }
    }
    
    componentDidMount = async () => {
        const response = await fetch("https://kudzayi-fam-back.herokuapp.com/receipt", {
             method: "GET", 
         headers: {
            "Content-Type": "Application/json",
          },
        })
        const details = await response.json()
        this.setState({
            receiptDetails:details
        })
        
    }

      updateReceiptDetails = (event) => {
    let postReceiptDetails = this.state.postReceiptDetails;
    let id = event.currentTarget.id;
    postReceiptDetails[id] = event.currentTarget.value;
    this.setState({
      postReceiptDetails,
    });
    }

     postReceipt = async () => {
         const res = await fetch("https://kudzayi-fam-back.herokuapp.com/receipt/sendreceipt", {
             method: "POST",
        body: JSON.stringify({
          quantity: this.state.postReceiptDetails.quantity, 
            price: this.state.postReceiptDetails.price,
          date:this.state.postReceiptDetails.date
        }) , 
         headers: {
            "Content-Type": "Application/json",
          },
            
         })
         if (res.ok) {
             window.reload()
         }
         else {
             alert("Something Went Wrong , Please check receipt details again")
         }
    }

    deleteReceipt =   async (id) => {
        const res = await fetch(`https://kudzayi-fam-back.herokuapp.com/receipt/delete/${id}`, {
             method: "DELETE", 
         headers: {
            "Content-Type": "Application/json",
            },
        })
        if (res.ok) {
            alert("Deleted")
            window.location.reload()
        }
    }
    render() { 
        return (
            <div id="wrapper">
            <Container id="all-wrapper">
                <div>
                    <h3 className="text-center">Welcome to the Family Record Book </h3>
                </div>
                <Row>
                    <Col xl={8}>
                        <div className="other-wrapper">
                            <h3 >Existing Receipts</h3>
                            {this.state.receiptDetails.map((d) => {
                                return (
                         <Card style={{ width: '18rem' }} className="mt-5 mb-5">
  <Card.Body>
                                            <Card.Title>{d.date}</Card.Title>
    <Card.Text>
       <div className="d-flex justify-content-between">
                          <div>
                            <h5>Quantity</h5>
                            <h4>{d.quantity}</h4>
                          </div>
                          <div>
                            <h5>Price</h5>
                            <h4>£ {d.price}</h4>
                          </div>
                        </div>
                                            </Card.Text>
                <button id="deleteButton" onClick = {(id)=> this.deleteReceipt(d._id)}>Delete</button>
  </Card.Body>
</Card>
                                )
                            })}
                       </div>
                    </Col>
                    <Col xl={4}>
                         <div className="other-wrapper">
                        <h3>Post A New Receipt</h3>
                          <Form  id="login-form" className="mt-5" >
            <Form.Group style={{ marginTop: "1rem" }}>
              <Form.Control
                htmlFor="quantity"
                className="mb-5"
                type="text"
                id="quantity"
                value={this.state.postReceiptDetails.quantity}
                placeholder="Please Enter Quantity"
                size="md"
                onChange={(e) => this.updateReceiptDetails(e)}
              />
              <Form.Control
                htmlFor="price"
                                        size="md"
                                         className="mb-5"
                id="price"
                value={this.state.postReceiptDetails.price}
                onChange={(e) => this.updateReceiptDetails(e)}
                type="price"
                placeholder="Please Enter Price"
                        />
                           <Form.Control
                htmlFor="date"
                size="md"
                id="date"
                value={this.state.postReceiptDetails.date}
                onChange={(e) => this.updateReceiptDetails(e)}
                type="date"
                placeholder="Please Enter Date Of Transaction"
              />
                        
            </Form.Group>
            <div className="text-center mt-5">
              <button id="post-receipt" type="submit" onClick={(e) => this.postReceipt(e)}>
                Post New Receipt
              </button>
            </div>
          </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
            </div>
          );
    }
}
 
export default Home;