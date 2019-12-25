import React, { Component } from 'react';
import { Card, CardImg,CardBody,CardText,CardTitle,Modal, ModalBody,ModalHeader, BreadcrumbItem, Breadcrumb, Button, Label, Col, Row } from 'reactstrap';

import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
            isModalOpen: false 
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(values){
        console.log("Current State is: "+ JSON.stringify(values));
        this.props.addComment(this.props.dishId, values.rating, values.yourname, values.comment);
    }
    render(){
        return(
            <>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil"/> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}><strong>Submit Comment</strong></ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)} >
                            <Row className="form-group">
                                <Col md={12}>
                                    <Label htmlFor="Rating">Rating</Label>
                                    <Control.select model=".rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                
                                <Col md={12}>
                                    <Label htmlFor="Your Name" >Your Name</Label>
                                    <Control.text model=".yourname" id="yourname" name="yourname" className="form-control" placeholder="Your Name" 
                                    validators={{
                                        required,
                                        minLength: minLength(3),
                                        maxLength:maxLength(15)
                                    }} />
                                    <Errors
                                        className="text-danger"
                                        model=".yourname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: ' Must be greater than 2 characters',
                                            maxLength: ' Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                
                                <Col md={12}>
                                <Label htmlFor="comment" >Your Comment</Label>
                                    <Control.textarea model=".comment" id="comment" name="comment" rows="6" placeholder="Your Comment" className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>

                        </LocalForm>
                            
                        
                    </ModalBody>
                </Modal>   
            
                
            </>
        )
    }
    
}

    
    function RenderDish({dish}){
        if(dish!= null){
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
            
        }
        else{
            return(
                <div></div>
            );
        }
    }
    function RenderComment({comments, addComment, dishId}){
        console.log(comments);

        if(comments!= null){
            const comment= comments.map((comment) =>{

                console.log(comment.comment);
                //console.log(new Date(comment.date).toDateString());
                console.log(new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))
                );
                return(
                    <ul  className="list-unstyled">
                        <li>{comment.comment}<br/>
                        --{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
                    </ul>
                );
            })
            return(
                <div className="container">
                <h4>Comment</h4>
                {comment}
                <CommentForm dishId={dishId} addComment={addComment} />
                </div>
            )
            
        }
        else{
            return(
                <div></div>
            )
        }
    }
    const Dishdetail =(props)=>{
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/menu">Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} /> 
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        
                        <RenderComment comments= {props.comments} addComment= { props.addComment}
                        dishId = { props.dish.id} />
                    </div>
                </div>
            </div>
            
            
        );
    }

export default Dishdetail;