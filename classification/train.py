import pdb
import torch
import torch.nn as nn
import torch.optim as optim
import torchvision.transforms as transforms
import torchvision.datasets as datasets
from torchvision.models import resnet50
from tqdm import tqdm
import numpy as np
from torchsummary import summary


def train(model, train_loader, criterion, optimizer, device):

    # Train the model
    for epoch in range(num_epochs):
        for images, labels in tqdm(train_loader):
            # Move the data to the GPU
            images, labels = images.to(device), labels.to(device)

            # Backward and optimize
            optimizer.zero_grad()

            # Forward pass
            outputs = model(images)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()

        # Validate the model
        with torch.no_grad():
            total = 0
            correct = 0
            accuracy = []
            for i, data in enumerate(train_loader, 0):
                inputs, labels = data
                inputs = inputs.to(device)
                labels = labels.to(device)

                outputs = model(inputs)

                _, predicted = torch.max(outputs.data, 1)
                total += labels.size(0)
                correct += (predicted == labels).sum().item()
                test_loss = criterion(outputs, labels).item()
                accuracy.append(100 * correct / total)

            print(
                "Epoch: %d/%d, Train loss: %.6f, Test loss: %.6f, Accuracy: %.2f"
                % (
                    epoch + 1,
                    num_epochs,
                    loss.item(),
                    test_loss,
                    100 * correct / total,
                )
            )
    return model


# 채널 별 mean 계산
def get_mean(dataset):
    meanRGB = [np.mean(image.numpy(), axis=(1, 2)) for image, _ in dataset]
    meanR = np.mean([m[0] for m in meanRGB])
    meanG = np.mean([m[1] for m in meanRGB])
    meanB = np.mean([m[2] for m in meanRGB])
    return [meanR, meanG, meanB]


# 채널 별 str 계산
def get_std(dataset):
    stdRGB = [np.std(image.numpy(), axis=(1, 2)) for image, _ in dataset]
    stdR = np.mean([s[0] for s in stdRGB])
    stdG = np.mean([s[1] for s in stdRGB])
    stdB = np.mean([s[2] for s in stdRGB])
    return [stdR, stdG, stdB]


if __name__ == "__main__":
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    num_classes = 100
    num_epochs = 20
    lr = 0.00001

    # create an instance of the model
    model = resnet50(
        pretrained=True,
    )
    model.fc = nn.Linear(2048, num_classes)
    model = model.to(device)

    # print the model architecture summary
    summary(model, (3, 128, 128))
    # pdb.set_trace()

    # Define the loss function and optimizer
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=lr)

    # Load the CIFAR-10 dataset
    train_dataset = datasets.ImageNet(
        root="./data", train=True, download=True, transform=transforms.ToTensor()
    )

    val_dataset = datasets.ImageNet(
        root="./data", train=False, download=True, transform=transforms.ToTensor()
    )

    train_transforms = transform = transforms.Compose(
        [
            transforms.Resize(256),
            transforms.CenterCrop(224),
            transforms.ToTensor(),
            transforms.Normalize(get_mean(train_dataset), get_std(train_dataset)),
        ]
    )
    val_transforms = transforms.Compose(
        [
            transforms.Resize(256),
            transforms.CenterCrop(224),
            transforms.ToTensor(),
            transforms.Normalize(get_mean(val_dataset), get_std(val_dataset)),
        ]
    )

    train_dataset.transforms = train_transforms
    val_dataset.transforms = val_transforms

    batch_size = 64
    train_loader = torch.utils.data.DataLoader(
        train_dataset,
        batch_size=batch_size,
        shuffle=True,
    )
    val_loader = torch.utils.data.DataLoader(
        val_dataset,
        batch_size=batch_size,
        shuffle=False,
    )
    model = train(model, train_loader, criterion, optimizer, device)

    # Save the model checkpoint
    torch.save(model.state_dict(), "resnet50_imagenet_epoch20.pth")
