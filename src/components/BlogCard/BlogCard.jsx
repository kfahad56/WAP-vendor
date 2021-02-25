/* eslint-disable */
import React, { Component } from 'react';
import './BlogCard.css';
import BlogButton from '../BlogButton/BlogButton';
import business from '../images/business.png';
class BlogCard extends Component {
    state = {}
    render() {
        return (
            <div className="blogCardContainer" onClick={this.props.onClick}>
                <div className="blogImage">
                    <img src={this.props.imgSRC} alt="" />
                </div>
                <h2>{this.props.Text}</h2>
                <h4>{this.props.subtext}</h4>
                <p>{this.props.desc}</p>
                <div className="buttonAdjust">
                    <BlogButton tags={this.props.tag1} />
                    <BlogButton tags={this.props.tag2} />
                </div>
            </div>
        );
    }
}

export default BlogCard;