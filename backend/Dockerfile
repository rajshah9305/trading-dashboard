# Use an official Python runtime as a parent image
FROM python:3.8.19-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container at /app
COPY ./requirements.txt /app/requirements.txt

# Install any needed packages specified in requirements.txt
# Using --no-cache-dir to reduce image size
# Using --default-timeout to prevent timeouts on slow networks
RUN pip install --no-cache-dir --default-timeout=100 -r /app/requirements.txt

# Copy the backend directory contents into the container at /app/backend
COPY ./backend /app/backend

# Make port 8000 available to the world outside this container (FastAPI default)
EXPOSE 8000

# Make port 8080 available (Freqtrade API default)
EXPOSE 8080

# Define environment variable
ENV PYTHONPATH=/app

# Command to run the FastAPI application using Uvicorn
# Ensure the main.py is in the correct path relative to WORKDIR
# The command should be `uvicorn backend.api.main:app --host 0.0.0.0 --port 8000`
# if main.py is in backend/api/
CMD ["sh", "-c", "uvicorn backend.api.main:app --host 0.0.0.0 --port 8000 & freqtrade trade --config backend/freqtrade/config.json --strategy-path backend/freqtrade/user_data/strategies --strategy AIProfitMaximizer"]