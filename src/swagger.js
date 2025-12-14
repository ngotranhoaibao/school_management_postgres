import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
dotenv.config();
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "School API",
      description: "API documentation for the School Management System",
    },
    servers: [
        { url: process.env.URL_APi || "http://localhost:3001/school", description: "Development server" }  
    ],
    components: {
      schemas: {
        Student: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "Student ID",
            },
            name: {
              type: "string",
              description: "Student name",
            },
            email: {
              type: "string",
              format: "email",
              description: "Student email",
            },
            courses: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Course",
              },
              description: "List of courses the student is enrolled in",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Creation timestamp",
            },
          },
          required: ["name", "email"],
        },
        Course: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "Course ID",
            },
            title: {
              type: "string",
              description: "Course title",
            },
            code: {
              type: "string",
              description: "Course code",
            },
            description: {
              type: "string",
              description: "Course description",
            },
            students: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Student",
              },
              description: "List of students enrolled in the course",
            },
          },
          required: ["title", "code"],
        },
        EnrollRequest: {
          type: "object",
          properties: {
            studentId: {
              type: "integer",
              description: "ID of the student",
            },
            courseId: {
              type: "integer",
              description: "ID of the course",
            },
          },
          required: ["studentId", "courseId"],
        },
        ErrorResponse: {
          type: "object",
          properties: {
            error: {
              type: "string",
              description: "Error message",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
