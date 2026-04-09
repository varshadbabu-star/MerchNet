import cv2
import numpy as np
try:
    from ultralytics import YOLO
except ImportError:
    print("Please install ultralytics to use YOLOv8 for theft detection: pip install ultralytics")
    exit(1)

# Load the YOLO model - in a real scenario, use a fine-tuned model for shoplifting
# For now, we'll use a pre-trained yolov8n.pt model to detect persons and backpacks/bags.
try:
    model = YOLO("yolov8n.pt")
except Exception as e:
    print(f"Error loading model: {e}")
    exit(1)

def detect_theft(video_source=0):
    cap = cv2.VideoCapture(video_source)
    if not cap.isOpened():
        print(f"Error: Could not open video source {video_source}")
        return

    print(f"Starting CCTV monitoring on source {video_source}")
    print("Press 'q' to quit")

    # Keep track of suspicious objects over frames
    # Simple alert threshold
    alert_frequency = 0

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # Run inference
        results = model(frame, stream=True, verbose=False)

        person_detected = False
        bag_detected = False

        for result in results:
            boxes = result.boxes
            for box in boxes:
                # Get coordinates and class
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                cls = int(box.cls[0])
                conf = float(box.conf[0])
                
                # Class 0 is 'person', Class 24 is 'backpack', Class 26 is 'handbag'
                name = model.names[cls]

                if name == "person" and conf > 0.5:
                    person_detected = True
                    # Draw blue box for person
                    cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 0, 0), 2)
                    cv2.putText(frame, f"Person {conf:.2f}", (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 2)
                elif name in ["backpack", "handbag", "suitcase"] and conf > 0.4:
                    bag_detected = True
                    # Draw orange box for bags
                    cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 165, 255), 2)
                    cv2.putText(frame, f"{name} {conf:.2f}", (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 165, 255), 2)

        # Simple heuristic: Person + Bag = Potential target for monitoring
        # (In production, replace this with a fine-tuned action recognition model)
        if person_detected and bag_detected:
            alert_frequency += 1
            if alert_frequency > 15: # Sustained detection over multiple frames
                cv2.putText(frame, "WARNING: SUSPICIOUS ACTIVITY", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 3)
                # Here you would trigger an API call to the Next.js backend
                # requests.post('http://localhost:3000/api/cctv/alert', json={'type': 'theft_suspected', 'camera': video_source})
        else:
            alert_frequency = max(0, alert_frequency - 1)

        cv2.imshow("MerchNet CCTV Monitor", frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    # 0 for default webcam, or provide a path to a video file
    detect_theft(0)
