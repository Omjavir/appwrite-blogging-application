import config from '../config/config'
import { Client, Databases, Storage, Query, ID } from 'appwrite'

export class PostService {

    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    // Post services

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {

            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )

        } catch (error) {
            console.log('Error creating post', error);
        }
    }

    async updatePost(slug, { title, content, status, featuredImage }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log('Error updating post', error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log('error deleting post', error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log('error getting post', error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log('error getting all posts', error);
            return false;
        }
    }

    // File upload services

    async uploadImage(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log('error uploading image', error);
        }
    }

    async deleteImage(imageId) {
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                imageId
            )
        } catch (error) {
            console.log('error deleting image', error);
            return false;
        }
    }

    getImagePreview(imageId) {
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            imageId
        )
    }

}

const postService = new PostService();

export default postService