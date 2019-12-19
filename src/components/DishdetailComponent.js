import React from 'react';
import { Card, CardImg,CardBody,CardText,CardTitle, BreadcrumbItem, Breadcrumb} from 'reactstrap';

import { Link } from 'react-router-dom';



    
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
    function RenderComment({comments}){
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
                        
                        <RenderComment comments= {props.comments} />
                    </div>
                </div>
            </div>
            
            
        );
    }

export default Dishdetail;