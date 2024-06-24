import mongoose from "mongoose";
import app from "../app.js"; // Adjust the path to your app.js file
import request from "supertest";
import path from "path";
import fs from 'fs';
let createdMaterialId;

beforeAll(async () => {
    process.env.TEST = true


});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
});

describe("Material API", () => {
    it("should create a new material", async () => {
        const imagePath = path.join("src/tests/", 'test_image.jpeg'); // Adjust the path to your image

        // Read the image file as a stream
        const imageStream = fs.createReadStream(imagePath);

        // Make a POST request with the form data
        const response = await request(app)
            .post('/api/v1/materials')
            .field('name', 'Test Material')
            .field('technology', 'Test Technology')
            .field('colors', JSON.stringify(['red', 'blue']))
            .field('pricePerGram', '2.5')
            .field('applicationTypes', JSON.stringify(['type1', 'type2']))
            .attach('material_img', imageStream);

        expect(response.status).toBe(201);
        expect(response.body.data).toHaveProperty("name", "Test Material");
        createdMaterialId = response.body.data._id;
    });

    it("should fetch all materials", async () => {
        const response = await request(app).get("/api/v1/materials");

        expect(response.status).toBe(200);
        expect(response.body.data.length).toBeGreaterThan(0);
    });

    it("should fetch a material by ID", async () => {
        const response = await request(app).get(`/api/v1/materials/${createdMaterialId}`);
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty("name", "Test Material");
    });

    it("should update a material by ID without image", async () => {
        const updatedData = {
            name: "Updated Material",
            technology: "Updated Technology",
            colors: ["green", "yellow"],
            pricePerGram: 3.5,
            applicationTypes: ["type3", "type4"],
        };

        const response = await request(app)
            .put(`/api/v1/materials/${createdMaterialId}`)
            .send(updatedData);

        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty("name", updatedData.name);
        expect(response.body.data).toHaveProperty("technology", updatedData.technology);
    });

    it("should delete a material by ID", async () => {
        const response = await request(app).delete(`/api/v1/materials/${createdMaterialId}`);
        expect(response.status).toBe(200);

        const fetchResponse = await request(app).get(`/api/v1/materials/${createdMaterialId}`);
        expect(fetchResponse.status).toBe(404);
    });
});
