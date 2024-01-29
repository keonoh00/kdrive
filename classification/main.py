import torch
import torch.nn as nn
import torchvision.transforms as transforms
from PIL import Image
from utils import get_CIFAR100_classnames
from torchvision.models.resnet import ResNet50_Weights
from torchvision.models.resnet import resnet50
import argparse


def predict(model):
    class_names = get_CIFAR100_classnames()

    # Make prediction on the image
    # Set the model in evaluation mode

    model.eval()
    with torch.no_grad():
        outputs = model(image)
        _, predicted = torch.max(outputs.data, 1)

    # Print the predicted label
    print("Predicted class:", class_names[predicted.item()].split(",")[0])


def argparser():

    # 인자값을 받을 수 있는 인스턴스 생성
    parser = argparse.ArgumentParser(description="PyTorch CIFAR10 Prediction")

    # 입력받을 인자값 설정 (default 값 설정가능)

    parser.add_argument("--image", type=str)

    # args 에 위의 내용 저장
    args = parser.parse_args()

    # 입력받은 인자값 출력
    return args


if __name__ == "__main__":
    args = argparser()

    image_path = args.image
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    # Define the model architecture and load the trained weights

    # Load the model
    model = resnet50(weights=ResNet50_Weights.IMAGENET1K_V1)

    image = Image.open(image_path)
    image = image.convert("RGB")
    transform = transforms.Compose(
        [
            transforms.Resize(256),
            transforms.CenterCrop(224),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ]
    )
    model = model.to(device)
    image = transform(image)
    image = image.unsqueeze(0)  # Add batch dimension
    image = image.to(device)

    predict(model)
