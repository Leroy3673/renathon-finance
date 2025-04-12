import { qdrantClient } from "../config/qdrantClient.mjs";

class QdrantController {
  
  // Checking Existing Collections
  async checkExistingCollections(request, response) {
    try {
      const existingCollections = await qdrantClient.getCollections();
      response.status(200)
              .json({ existingCollections }); 
      
    } catch (error) {
      console.error("Error checking existing collections:", error);
      response.status(500)
              .json({ error: "Internal server error" });
      
    }
  }

  // Creating a Collection
  async createCollection(request, response) {
    try {
      const { collectionName, vectorSize, distance } = request.body;

      if(!collectionName || !vectorSize || !distance) {
        return response.status(400)
                       .json({ error: "Missing required fields" });
      }

      await qdrantClient.createCollection(
        collectionName,
        {
          vectors:{
            size: vectorSize,
            distance: distance,
          }
        }      
      );

      response.status(201)
              .json({ message: "Collection created successfully" });
      
    } catch (error) {
      console.error("Error creating collection:", error);
      response.status(500)
              .json({ error: "Internal server error" });
      
    }
  }

  // Deleting a Collection
  async deleteCollection(request, response) {
    try {
      const { collectionName } = request.body;

      if (!collectionName || typeof collectionName !== "string") {
        return response.status(400)
                       .json({ error: "Missing or invalid 'collectionName'" });
      }

      await qdrantClient.deleteCollection(collectionName);

      return response.status(200)
                     .json({ message: "Collection deleted successfully" });

    } catch (error) {
      console.error("Error deleting collection:", error);
      return response.status(500).json({ error: "Internal server error" });
    }
  }

}

export const qdrantControllers=new QdrantController();