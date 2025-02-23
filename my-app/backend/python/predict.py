# # import torch
# # import torchvision.transforms as transforms
# # from PIL import Image
# # from torchvision import models
# # import torch.nn as nn

# # # Load Model
# # model = models.resnet50(pretrained=False)
# # num_ftrs = model.fc.in_features
# # model.fc = nn.Linear(num_ftrs, 2)
# # model.load_state_dict(torch.load("C:/Users/Asus/OneDrive/Desktop/Techathon/my-app/backend/python/py/binary_food_detection.pth", map_location=torch.device('cpu')))
# # model.eval()

# # # Define Transform
# # transform = transforms.Compose([
# #     transforms.Resize((224, 224)),
# #     transforms.ToTensor(),
# #     transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
# # ])

# # # Prediction Function
# # def predict(image_path):
# #     image = Image.open(image_path)
# #     image = transform(image).unsqueeze(0)

# #     with torch.no_grad():
# #         output = model(image)
# #         _, predicted = torch.max(output, 1)

# #     return "Food" if predicted.item() == 0 else "Non-Food"

# # # Example
# # image_path = r"C:/Users/Asus/Downloads/litti.jpg"
# # result = predict(image_path)
# # print("Prediction:", result)

# import torch
# import torchvision.transforms as transforms
# import torchvision.models as models
# from PIL import Image
# from flask import Flask, request, jsonify
# from flask_cors import CORS  # Import CORS to enable cross-origin requests
# import os

# # Load all 101 food labels (ensure your full list is included)
# food_labels = ['adhirasam', 'aloo_gobi', 'aloo_matar', 'aloo_methi', 'aloo_shimla_mirch', 'aloo_tikki', 'anarsa',
#                'ariselu', 'bandar_laddu', 'basundi', 'bhatura', 'bhindi_masala', 'biryani', 'boondi', 'butter_chicken',
#                'chak_hao_kheer', 'cham_cham', 'chana_masala', 'chapati', 'chhena_kheeri', 'chicken_razala',
#                'chicken_tikka', 'chicken_tikka_masala', 'chikki', 'daal_baati_churma', 'daal_puri', 'dal_makhani',
#                'dal_tadka', 'dharwad_pedha', 'doodhpak', 'double_ka_meetha', 'dum_aloo', 'gajar_ka_halwa', 'gavvalu',
#                'ghevar', 'gulab_jamun', 'imarti', 'jalebi', 'kachori', 'kadai_paneer', 'kadhi_pakoda', 'kajjikaya',
#                'kakinada_khaja', 'kalakand', 'karela_bharta', 'kofta', 'kuzhi_paniyaram', 'lassi', 'ledikeni',
#                'litti_chokha', 'lyangcha', 'maach_jhol', 'makki_di_roti_sarson_da_saag', 'malapua', 'misi_roti',
#                'misti_doi', 'modak', 'mysore_pak', 'naan', 'navrattan_korma', 'palak_paneer', 'paneer_butter_masala',
#                'phirni', 'pithe', 'poha', 'poornalu', 'pootharekulu', 'qubani_ka_meetha', 'rabri', 'ras_malai',
#                'rasgulla', 'sandesh', 'shankarpali', 'sheer_korma', 'sheera', 'shrikhand', 'sohan_halwa', 'sohan_papdi',
#                'sutar_feni', 'unni_appam']

# # Load trained model
# device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
# model = models.resnet50(weights=None)
# num_ftrs = model.fc.in_features
# model.fc = torch.nn.Linear(num_ftrs, 80)  # Adjust to match your trained model output
# model.load_state_dict(torch.load("C:/Users/Asus/OneDrive/Desktop/Techathon/my-app/backend/python/py/indian_food_resnet50.pth", map_location=device), strict=False)
# model.to(device)
# model.eval()

# # Image preprocessing pipeline
# transform = transforms.Compose([
#     transforms.Resize((224, 224)),
#     transforms.ToTensor(),
#     transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
# ])

# def predict_image(image_path):
#     """Predict the food name for a given image."""
#     image = Image.open(image_path).convert("RGB")
#     image = transform(image).unsqueeze(0).to(device)
#     with torch.no_grad():
#         outputs = model(image)
#         _, predicted = torch.max(outputs, 1)
#         predicted_idx = predicted.item()
#         if 0 <= predicted_idx < len(food_labels):
#             return food_labels[predicted_idx]
#         else:
#             return "Unknown Food"

# # Set up the Flask app with a prediction endpoint
# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes

# @app.route('/api/predict', methods=['POST'])
# def predict():
#     if 'foodImage' not in request.files:
#         return jsonify({'error': 'No file part in request'}), 400
#     file = request.files['foodImage']
#     if file.filename == '':
#         return jsonify({'error': 'No file selected'}), 400
#     # Save the file temporarily
#     temp_path = "temp_image.jpg"
#     file.save(temp_path)
#     try:
#         result = predict_image(temp_path)
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500
#     finally:
#         os.remove(temp_path)
#     return jsonify({'prediction': result})

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000)

# import torch
# import torchvision.transforms as transforms
# import torchvision.models as models
# from PIL import Image
# from flask import Flask, request, jsonify
# from flask_cors import CORS  # Enable cross-origin requests
# import os

# # List of food labels (ensure your full list is included)
# food_labels = [
#     'adhirasam', 'aloo_gobi', 'aloo_matar', 'aloo_methi', 'aloo_shimla_mirch', 'aloo_tikki', 'anarsa',
#     'ariselu', 'bandar_laddu', 'basundi', 'bhatura', 'bhindi_masala', 'biryani', 'boondi', 'butter_chicken',
#     'chak_hao_kheer', 'cham_cham', 'chana_masala', 'chapati', 'chhena_kheeri', 'chicken_razala',
#     'chicken_tikka', 'chicken_tikka_masala', 'chikki', 'daal_baati_churma', 'daal_puri', 'dal_makhani',
#     'dal_tadka', 'dharwad_pedha', 'doodhpak', 'double_ka_meetha', 'dum_aloo', 'gajar_ka_halwa', 'gavvalu',
#     'ghevar', 'gulab_jamun', 'imarti', 'jalebi', 'kachori', 'kadai_paneer', 'kadhi_pakoda', 'kajjikaya',
#     'kakinada_khaja', 'kalakand', 'karela_bharta', 'kofta', 'kuzhi_paniyaram', 'lassi', 'ledikeni',
#     'litti_chokha', 'lyangcha', 'maach_jhol', 'makki_di_roti_sarson_da_saag', 'malapua', 'misi_roti',
#     'misti_doi', 'modak', 'mysore_pak', 'naan', 'navrattan_korma', 'palak_paneer', 'paneer_butter_masala',
#     'phirni', 'pithe', 'poha', 'poornalu', 'pootharekulu', 'qubani_ka_meetha', 'rabri', 'ras_malai',
#     'rasgulla', 'sandesh', 'shankarpali', 'sheer_korma', 'sheera', 'shrikhand', 'sohan_halwa', 'sohan_papdi',
#     'sutar_feni', 'unni_appam'
# ]

# # Set up device and load the trained model
# device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
# model = models.resnet50(weights=None)
# num_ftrs = model.fc.in_features
# model.fc = torch.nn.Linear(num_ftrs, 80)  # Adjust to match your trained model output
# model.load_state_dict(
#     torch.load("C:/Users/Asus/OneDrive/Desktop/Techathon/my-app/backend/python/py/indian_food_resnet50.pth", map_location=device),
#     strict=False
# )
# model.to(device)
# model.eval()

# # Define the image preprocessing pipeline
# transform = transforms.Compose([
#     transforms.Resize((224, 224)),
#     transforms.ToTensor(),
#     transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
# ])

# def predict_image(image_path):
#     """Predict the food label for a given image."""
#     image = Image.open(image_path).convert("RGB")
#     image = transform(image).unsqueeze(0).to(device)
#     with torch.no_grad():
#         outputs = model(image)
#         _, predicted = torch.max(outputs, 1)
#         predicted_idx = predicted.item()
#     return food_labels[predicted_idx] if 0 <= predicted_idx < len(food_labels) else "Unknown Food"

# # Set up the Flask app and enable CORS
# app = Flask(__name__)
# CORS(app)

# @app.route('/api/donations', methods=['POST'])
# def donations():
#     # Retrieve donation details from the form
#     donorName = request.form.get("donorName")
#     contactNumber = request.form.get("contactNumber")
#     donorType = request.form.get("donorType")
#     foodFor = request.form.get("foodFor")
#     foodType = request.form.get("foodType")
#     quantity = request.form.get("quantity")
#     address = request.form.get("address")
#     latitude = request.form.get("latitude")
#     longitude = request.form.get("longitude")
    
#     # Validate and process the uploaded image
#     if 'foodImage' not in request.files:
#         return jsonify({'error': 'No file part in request'}), 400
#     file = request.files['foodImage']
#     if file.filename == '':
#         return jsonify({'error': 'No file selected'}), 400
    
#     temp_path = "temp_image.jpg"
#     file.save(temp_path)
#     try:
#         predictedFood = predict_image(temp_path)
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500
#     finally:
#         if os.path.exists(temp_path):
#             os.remove(temp_path)
    
#     # Return response with donation details and prediction result
#     return jsonify({
#         'status': 'success',
#         'predictedFood': predictedFood,
#         'donorName': donorName,
#         'contactNumber': contactNumber,
#         'donorType': donorType,
#         'foodFor': foodFor,
#         'foodType': foodType,
#         'quantity': quantity,
#         'address': address,
#         'latitude': latitude,
#         'longitude': longitude
#     })

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000)



