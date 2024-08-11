import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TaskProps {
    title: string;
    description?: string;
    completed: boolean;
    onDelete: () => void;
    onToggleComplete: () => void;
}

const styles = StyleSheet.create({
    taskContainer: {
        backgroundColor: "#f9f9f9",
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    completed: {
        backgroundColor: "#d3ffd8",
    },
    taskTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    taskDescription: {
        fontSize: 14,
        color: "#888",
    },
    deleteButton: {
        marginLeft: 10,
    },
    deleteButtonText: {
        color: 'red'
    },
});

const Task = ({ title,
    description,
    completed,
    onDelete,
    onToggleComplete
}: TaskProps) => {
    return (
        <View style={[styles.taskContainer, completed && styles.completed]}>
            <TouchableOpacity onPress={onToggleComplete}>
                <Text style={styles.taskTitle}>
                    {title}
                </Text>
                {description ? <Text
                    style={styles.taskDescription}>
                    {description}
                </Text> : null}
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete}
                style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>
                    Delete </Text>
            </TouchableOpacity>
        </View>
    );
}

export default Task;