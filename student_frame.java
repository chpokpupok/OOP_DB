import javax.swing.*;
import javax.swing.border.TitledBorder;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;

public class student_frame extends JFrame {

    private JPanel centerPanel;
    private ArrayList<CourseworkPanel> courseworkPanels = new ArrayList<>();

    // ==================== КОНСТАНТЫ ДЛЯ API ====================
    private static final String BASE_API_URL = "http://localhost:3001";
    private static final String PROCEDURE_API_URL = BASE_API_URL + "/api/procedure";
    private static final String QUERY_API_URL = BASE_API_URL + "/api/query";
    private static final String FUNCTION_API_URL = BASE_API_URL + "/api/function";

    // Процедуры для студента
    private static final String INSERT_COURSEWORK_API_URL = PROCEDURE_API_URL + "/insert_coursework";
    private static final String UPDATE_COURSEWORK_STUDENT_API_URL = PROCEDURE_API_URL + "/update_coursework_student";
    private static final String DELETE_COURSEWORK_API_URL = PROCEDURE_API_URL + "/delete_coursework";

    // Обычные запросы
    private static final String GET_COURSEWORKS_API_URL = QUERY_API_URL + "/get_courseworks";
    private static final String ADD_COURSEWORK_QUERY_API_URL = QUERY_API_URL + "/add_coursework";
    private static final String UPDATE_COURSEWORK_QUERY_API_URL = QUERY_API_URL + "/update_coursework";

    // Функции
    private static final String GET_COURSEWORKS_FOR_TEACHER_API_URL = FUNCTION_API_URL + "/get_courseworks_for_teacher";
    private static final String GET_COURSEWORK_REPORT_API_URL = FUNCTION_API_URL + "/get_coursework_report";

    // ID студента (должен приходить после авторизации)
    private String studentId = "1"; // Временное значение, нужно получать после логина

    // Внутренний класс для хранения данных о курсовой
    private class CourseworkPanel {
        String title;
        String subject;
        JPanel panel;
        JTextField topicField;
        JTextField linkField;
        JCheckBox selectCheckBox;
        boolean submitted = false;
        int courseworkId = -1; // ID из базы данных

        CourseworkPanel(String title, String subject, JPanel panel,
                        JTextField topicField, JTextField linkField,
                        JCheckBox selectCheckBox) {
            this.title = title;
            this.subject = subject;
            this.panel = panel;
            this.topicField = topicField;
            this.linkField = linkField;
            this.selectCheckBox = selectCheckBox;
        }
    }

    public student_frame() {
        // Настройка окна
        setTitle("Окно студента");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(850, 700);
        setLocationRelativeTo(null);

        // Создаем интерфейс
        createUI();

        // Загружаем курсовые работы из базы данных
        loadCourseworksFromDatabase();

        // Показываем окно
        setVisible(true);
    }

    private void createUI() {
        // Основная панель
        JPanel mainPanel = new JPanel(new BorderLayout(10, 10));
        mainPanel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));

        // 1. Верхняя панель с заголовком
        JPanel topPanel = createTopPanel();

        // 2. Центральная панель с курсовыми работами
        centerPanel = new JPanel();
        centerPanel.setLayout(new BoxLayout(centerPanel, BoxLayout.Y_AXIS));

        // Создаем начальные курсовые работы
        createInitialCourseworks();

        // Прокрутка если много работ
        JScrollPane scrollPane = new JScrollPane(centerPanel);
        scrollPane.setBorder(BorderFactory.createTitledBorder("Мои работы"));

        // 3. Нижняя панель с кнопками
        JPanel bottomPanel = createBottomPanel();

        // Собираем всё вместе
        mainPanel.add(topPanel, BorderLayout.NORTH);
        mainPanel.add(scrollPane, BorderLayout.CENTER);
        mainPanel.add(bottomPanel, BorderLayout.SOUTH);

        // Добавляем основную панель в окно
        add(mainPanel);
    }

    private JPanel createTopPanel() {
        JPanel panel = new JPanel(new BorderLayout());
        panel.setBackground(new Color(220, 240, 255));
        panel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));

        JLabel titleLabel = new JLabel("Личный кабинет студента");
        titleLabel.setFont(new Font("Arial", Font.BOLD, 18));
        panel.add(titleLabel, BorderLayout.WEST);

        return panel;
    }

    private JPanel createBottomPanel() {
        JPanel panel = new JPanel(new FlowLayout(FlowLayout.CENTER, 20, 10));

        JButton addButton = createStyledButton("+ Добавить курсовую", new Color(46, 125, 50), 14);
        JButton submitSelectedButton = createStyledButton("-> Отправить выбранные", new Color(30, 144, 255), 14);
        JButton submitAllButton = createStyledButton("-> Отправить все", new Color(65, 105, 225), 14);
        JButton refreshButton = createStyledButton("Обновить", new Color(128, 128, 128), 14);

        addButton.addActionListener(e -> addNewCoursework());
        submitSelectedButton.addActionListener(e -> submitSelectedForReview());
        submitAllButton.addActionListener(e -> submitAllForReview());
        refreshButton.addActionListener(e -> loadCourseworksFromDatabase());

        panel.add(addButton);
        panel.add(submitSelectedButton);
        panel.add(submitAllButton);
        panel.add(refreshButton);

        return panel;
    }

    private JButton createStyledButton(String text, Color color, int fontSize) {
        JButton button = new JButton(text);
        button.setBackground(color);
        button.setForeground(Color.WHITE);
        button.setFont(new Font("Arial", Font.BOLD, fontSize));
        button.setFocusPainted(false);
        button.setBorder(BorderFactory.createEmptyBorder(10, 20, 10, 20));
        button.setCursor(new Cursor(Cursor.HAND_CURSOR));

        button.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseEntered(java.awt.event.MouseEvent evt) {
                button.setBackground(color.darker());
            }
            public void mouseExited(java.awt.event.MouseEvent evt) {
                button.setBackground(color);
            }
        });

        return button;
    }

    private void createInitialCourseworks() {
        centerPanel.removeAll();
        courseworkPanels.clear();

        addCourseworkToPanel("Курсовая", "Базы данных");
        addCourseworkToPanel("Курсовая", "ООП");
        addCourseworkToPanel("ВКР", "По выбору");

        centerPanel.revalidate();
        centerPanel.repaint();
    }

    private void addCourseworkToPanel(String title, String subject) {
        JPanel panel = createCourseworkPanel(title, subject);
        centerPanel.add(Box.createRigidArea(new Dimension(0, 10)));
        centerPanel.add(panel);
    }

    private JPanel createCourseworkPanel(String title, String subject) {
        JPanel panel = new JPanel(new BorderLayout(10, 10));
        panel.setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createLineBorder(new Color(100, 100, 100), 1),
                BorderFactory.createEmptyBorder(15, 15, 15, 15)
        ));
        panel.setBackground(new Color(245, 245, 245));
        panel.setMaximumSize(new Dimension(800, 200));

        // Верхняя панель с чекбоксом и заголовком
        JPanel topPanel = new JPanel(new BorderLayout());
        topPanel.setOpaque(false);

        // Чекбокс для выбора
        JCheckBox selectCheckBox = new JCheckBox();
        selectCheckBox.setSelected(false);

        // Заголовок
        JLabel titleLabel = new JLabel(title + " (" + subject + ")");
        titleLabel.setFont(new Font("Arial", Font.BOLD, 14));
        titleLabel.setForeground(new Color(0, 51, 102));

        topPanel.add(selectCheckBox, BorderLayout.WEST);
        topPanel.add(titleLabel, BorderLayout.CENTER);

        // Поля для ввода
        JPanel fieldsPanel = new JPanel(new GridLayout(2, 2, 10, 10));

        JLabel topicLabel = new JLabel("Тема работы:");
        JTextField topicField = new JTextField();
        topicField.setText("Введите тему...");

        JLabel linkLabel = new JLabel("Ссылка на материалы:");
        JTextField linkField = new JTextField();
        linkField.setText("https://...");

        setupTextFieldPlaceholder(topicField, "Введите тему...");
        setupTextFieldPlaceholder(linkField, "https://...");

        fieldsPanel.add(topicLabel);
        fieldsPanel.add(topicField);
        fieldsPanel.add(linkLabel);
        fieldsPanel.add(linkField);

        // Кнопка сохранения
        JButton saveButton = new JButton("Сохранить");
        saveButton.setFont(new Font("Arial", Font.PLAIN, 12));
        saveButton.setBackground(new Color(50, 150, 50));
        saveButton.setForeground(Color.WHITE);
        saveButton.setFocusPainted(false);

        saveButton.addActionListener(e -> saveCourseworkData(title, subject, topicField, linkField));

        // Сохраняем панель в список
        courseworkPanels.add(new CourseworkPanel(title, subject, panel, topicField, linkField, selectCheckBox));

        // Собираем панель
        panel.add(topPanel, BorderLayout.NORTH);
        panel.add(fieldsPanel, BorderLayout.CENTER);
        panel.add(saveButton, BorderLayout.SOUTH);

        return panel;
    }

    private void setupTextFieldPlaceholder(JTextField field, String placeholder) {
        field.setForeground(Color.GRAY);

        field.addFocusListener(new java.awt.event.FocusAdapter() {
            public void focusGained(java.awt.event.FocusEvent evt) {
                if (field.getText().equals(placeholder)) {
                    field.setText("");
                    field.setForeground(Color.BLACK);
                }
            }

            public void focusLost(java.awt.event.FocusEvent evt) {
                if (field.getText().isEmpty()) {
                    field.setText(placeholder);
                    field.setForeground(Color.GRAY);
                }
            }
        });
    }

    private void saveCourseworkData(String title, String subject, JTextField topicField, JTextField linkField) {
        String topic = topicField.getText().trim();
        String link = linkField.getText().trim();

        if (topic.isEmpty() || topic.equals("Введите тему...")) {
            JOptionPane.showMessageDialog(this, "Пожалуйста, введите тему работы",
                    "Ошибка", JOptionPane.ERROR_MESSAGE);
            topicField.requestFocus();
            return;
        }

        if (!link.isEmpty() && !link.equals("https://...")) {
            if (!link.startsWith("http://") && !link.startsWith("https://")) {
                JOptionPane.showMessageDialog(this, "Ссылка должна начинаться с http:// или https://",
                        "Ошибка ссылки", JOptionPane.WARNING_MESSAGE);
                linkField.requestFocus();
                return;
            }
        }

        // Отправляем данные в базу данных через API (процедура update_coursework_student)
        sendUpdateCourseworkRequest(-1, topic, link); // -1 означает, что это новая курсовая

        JOptionPane.showMessageDialog(this,
                "Ваши данные успешно сохранены!\n\n" +
                        "Работа: " + title + "\n" +
                        "Тема: " + topic + "\n" +
                        "Ссылка: " + (link.isEmpty() || link.equals("https://...") ? "не указана" : link),
                "Сохранение данных", JOptionPane.INFORMATION_MESSAGE);
    }

    private void addNewCoursework() {
        String[] subjects = {"Базы данных", "ООП", "Веб-технологии", "Алгоритмы", "Математика"};

        JPanel inputPanel = new JPanel(new GridLayout(2, 2, 10, 10));
        JTextField nameField = new JTextField("Курсовая " + (courseworkPanels.size() + 1));
        JComboBox<String> subjectCombo = new JComboBox<>(subjects);

        inputPanel.add(new JLabel("Название:"));
        inputPanel.add(nameField);
        inputPanel.add(new JLabel("Дисциплина:"));
        inputPanel.add(subjectCombo);

        int result = JOptionPane.showConfirmDialog(this, inputPanel,
                "Добавить новую курсовую", JOptionPane.OK_CANCEL_OPTION, JOptionPane.PLAIN_MESSAGE);

        // ЕСЛИ НАЖАЛИ CANCEL - ВЫХОДИМ БЕЗ ДОБАВЛЕНИЯ
        if (result != JOptionPane.OK_OPTION) {
            return;
        }

        String title = nameField.getText().trim();
        String subject = (String) subjectCombo.getSelectedItem();

        if (title.isEmpty()) {
            JOptionPane.showMessageDialog(this, "Название не может быть пустым",
                    "Ошибка", JOptionPane.ERROR_MESSAGE);
            return;
        }

        // Добавляем новую курсовую в базу данных через API (процедура insert_coursework)
        sendInsertCourseworkRequest(title, subject, "Введите тему...", "");

        // Добавляем новую курсовую в интерфейс
        addCourseworkToPanel(title, subject);
        centerPanel.revalidate();
        centerPanel.repaint();

        // Прокручиваем к новой
        JScrollPane scrollPane = (JScrollPane) centerPanel.getParent().getParent();
        JScrollBar verticalBar = scrollPane.getVerticalScrollBar();
        verticalBar.setValue(verticalBar.getMaximum());

        JOptionPane.showMessageDialog(this,
                "Новая курсовая работа добавлена!\n" +
                        "Название: " + title + "\n" +
                        "Дисциплина: " + subject,
                "Добавление курсовой", JOptionPane.INFORMATION_MESSAGE);
    }

    private void submitSelectedForReview() {
        ArrayList<CourseworkPanel> selectedPanels = new ArrayList<>();
        ArrayList<CourseworkPanel> invalidPanels = new ArrayList<>();

        // Проверяем выбранные работы
        for (CourseworkPanel cw : courseworkPanels) {
            if (cw.selectCheckBox.isSelected()) {
                if (cw.submitted) {
                    JOptionPane.showMessageDialog(this,
                            "Работа \"" + cw.title + "\" уже отправлена на проверку!",
                            "Ошибка", JOptionPane.WARNING_MESSAGE);
                    return;
                }

                String topic = cw.topicField.getText().trim();
                if (topic.isEmpty() || topic.equals("Введите тему...")) {
                    invalidPanels.add(cw);
                } else {
                    selectedPanels.add(cw);
                }
            }
        }

        if (selectedPanels.isEmpty()) {
            if (!invalidPanels.isEmpty()) {
                StringBuilder errorMsg = new StringBuilder("Нельзя отправить работы без темы:\n");
                for (CourseworkPanel cw : invalidPanels) {
                    errorMsg.append("- ").append(cw.title).append("\n");
                }
                JOptionPane.showMessageDialog(this, errorMsg.toString(),
                        "Ошибка", JOptionPane.ERROR_MESSAGE);
            } else {
                JOptionPane.showMessageDialog(this,
                        "Выберите работы для отправки (поставьте галочки)",
                        "Ошибка", JOptionPane.WARNING_MESSAGE);
            }
            return;
        }

        // Показываем список выбранных работ
        StringBuilder worksList = new StringBuilder("Выбранные работы:\n\n");
        for (CourseworkPanel cw : selectedPanels) {
            worksList.append("• ").append(cw.title).append(" (").append(cw.subject).append(")\n");
        }

        if (!invalidPanels.isEmpty()) {
            worksList.append("\nРаботы без темы не будут отправлены:\n");
            for (CourseworkPanel cw : invalidPanels) {
                worksList.append("- ").append(cw.title).append("\n");
            }
        }

        int response = JOptionPane.showConfirmDialog(this,
                worksList.toString() + "\n\nОтправить выбранные работы на проверку?",
                "Подтверждение отправки", JOptionPane.YES_NO_OPTION, JOptionPane.QUESTION_MESSAGE);

        if (response == JOptionPane.YES_OPTION) {
            // Отправляем каждую работу через API
            for (CourseworkPanel cw : selectedPanels) {
                String topic = cw.topicField.getText().trim();
                String link = cw.linkField.getText().trim();
                if (link.equals("https://...")) link = "";

                // Отправляем запрос на сервер для обновления статуса
                sendUpdateCourseworkRequest(cw.courseworkId, topic, link);

                cw.submitted = true;
                cw.selectCheckBox.setEnabled(false);
                cw.topicField.setEnabled(false);
                cw.linkField.setEnabled(false);
                cw.panel.setBackground(new Color(230, 230, 230));
            }

            JOptionPane.showMessageDialog(this,
                    "Выбранные работы успешно отправлены на проверку!\n\n" +
                            "Отправлено работ: " + selectedPanels.size() + "\n" +
                            "Статус: На проверке у преподавателя\n" +
                            "Ожидайте обратной связи в течение 3-5 рабочих дней.",
                    "Отправка на проверку", JOptionPane.INFORMATION_MESSAGE);
        }
    }

    private void submitAllForReview() {
        ArrayList<CourseworkPanel> validPanels = new ArrayList<>();
        ArrayList<CourseworkPanel> invalidPanels = new ArrayList<>();

        for (CourseworkPanel cw : courseworkPanels) {
            if (!cw.submitted) {
                String topic = cw.topicField.getText().trim();
                if (topic.isEmpty() || topic.equals("Введите тему...")) {
                    invalidPanels.add(cw);
                } else {
                    validPanels.add(cw);
                }
            }
        }

        if (validPanels.isEmpty()) {
            if (!invalidPanels.isEmpty()) {
                StringBuilder errorMsg = new StringBuilder("Нельзя отправить работы:\n");
                for (CourseworkPanel cw : invalidPanels) {
                    errorMsg.append("- ").append(cw.title).append(" (нет темы)\n");
                }
                JOptionPane.showMessageDialog(this, errorMsg.toString(),
                        "Ошибка", JOptionPane.ERROR_MESSAGE);
            } else {
                JOptionPane.showMessageDialog(this,
                        "Все работы уже отправлены или нет работ для отправки",
                        "Информация", JOptionPane.INFORMATION_MESSAGE);
            }
            return;
        }

        // Показываем список
        StringBuilder worksList = new StringBuilder("Все работы:\n\n");
        for (CourseworkPanel cw : validPanels) {
            worksList.append("✓ ").append(cw.title).append(" (").append(cw.subject).append(")\n");
        }

        if (!invalidPanels.isEmpty()) {
            worksList.append("\nРаботы без темы не будут отправлены:\n");
            for (CourseworkPanel cw : invalidPanels) {
                worksList.append("✗ ").append(cw.title).append(" (").append(cw.subject).append(")\n");
            }
        }

        int response = JOptionPane.showConfirmDialog(this,
                worksList.toString() + "\n\nОтправить все заполненные работы на проверку?",
                "Подтверждение отправки", JOptionPane.YES_NO_OPTION, JOptionPane.QUESTION_MESSAGE);

        if (response == JOptionPane.YES_OPTION) {
            for (CourseworkPanel cw : validPanels) {
                String topic = cw.topicField.getText().trim();
                String link = cw.linkField.getText().trim();
                if (link.equals("https://...")) link = "";

                // Отправляем запрос на сервер для каждой работы
                sendUpdateCourseworkRequest(cw.courseworkId, topic, link);

                cw.submitted = true;
                cw.selectCheckBox.setEnabled(false);
                cw.topicField.setEnabled(false);
                cw.linkField.setEnabled(false);
                cw.panel.setBackground(new Color(230, 230, 230));
            }

            JOptionPane.showMessageDialog(this,
                    "✓ Все работы успешно отправлены на проверку!\n\n" +
                            "Отправлено работ: " + validPanels.size() + "\n" +
                            "Не отправлено (без темы): " + invalidPanels.size() + "\n" +
                            "Статус: На проверке у преподавателя",
                    "Отправка на проверку", JOptionPane.INFORMATION_MESSAGE);
        }
    }

    // ==================== НОВЫЕ МЕТОДЫ ДЛЯ РАБОТЫ С БАЗОЙ ДАННЫХ ====================

    private void loadCourseworksFromDatabase() {
        new Thread(() -> {
            try {
                URL url = new URL(GET_COURSEWORKS_API_URL);
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                connection.setRequestMethod("GET");

                int responseCode = connection.getResponseCode();

                SwingUtilities.invokeLater(() -> {
                    if (responseCode == HttpURLConnection.HTTP_OK) {
                        System.out.println("Курсовые работы успешно загружены из БД");
                        // Здесь можно добавить обработку JSON ответа
                        // и создание панелей из данных базы
                    } else {
                        System.out.println("Ошибка при загрузке курсовых из БД. Код: " + responseCode);
                    }
                });

                connection.disconnect();

            } catch (Exception ex) {
                SwingUtilities.invokeLater(() -> {
                    System.err.println("Ошибка при загрузке курсовых: " + ex.getMessage());
                });
                ex.printStackTrace();
            }
        }).start();
    }

    private void sendInsertCourseworkRequest(String title, String subject, String topic, String link) {
        new Thread(() -> {
            try {
                URL url = new URL(INSERT_COURSEWORK_API_URL);
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                connection.setRequestMethod("POST");
                connection.setRequestProperty("Content-Type", "application/json");
                connection.setDoOutput(true);

                // Формирование JSON для процедуры insert_coursework
                // Параметры: student_id, supervisor_id, discipline_id, topic
                // Временные значения для supervisor_id и discipline_id
                String jsonInputString = String.format(
                        "{\"student_id\": %s, \"supervisor_id\": %d, \"discipline_id\": %d, \"topic\": \"%s\"}",
                        studentId,
                        1, // supervisor_id - нужно получить реальный ID
                        1, // discipline_id - нужно получить по названию предмета
                        topic
                );

                // Отправка данных
                try (OutputStream os = connection.getOutputStream()) {
                    byte[] input = jsonInputString.getBytes("utf-8");
                    os.write(input, 0, input.length);
                }

                // Получение ответа
                int responseCode = connection.getResponseCode();

                SwingUtilities.invokeLater(() -> {
                    if (responseCode == HttpURLConnection.HTTP_OK || responseCode == HttpURLConnection.HTTP_CREATED) {
                        System.out.println("Новая курсовая успешно создана в БД через процедуру insert_coursework");
                    } else {
                        System.out.println("Ошибка при создании курсовой. Код: " + responseCode);
                    }
                });

                connection.disconnect();

            } catch (Exception ex) {
                SwingUtilities.invokeLater(() -> {
                    System.err.println("Ошибка при создании курсовой: " + ex.getMessage());
                });
                ex.printStackTrace();
            }
        }).start();
    }

    private void sendUpdateCourseworkRequest(int courseworkId, String topic, String link) {
        new Thread(() -> {
            try {
                URL url = new URL(UPDATE_COURSEWORK_STUDENT_API_URL);
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                connection.setRequestMethod("PUT");
                connection.setRequestProperty("Content-Type", "application/json");
                connection.setDoOutput(true);

                // Формирование JSON для процедуры update_coursework_student
                String jsonInputString;

                if (courseworkId == -1) {
                    // Для новой курсовой (без ID)
                    jsonInputString = String.format(
                            "{\"coursework_id\": %d, \"topic\": \"%s\", \"materials_link\": \"%s\"}",
                            0, // Временное значение, нужно получить реальный ID
                            topic, link
                    );
                } else {
                    // Для существующей курсовой
                    jsonInputString = String.format(
                            "{\"coursework_id\": %d, \"topic\": \"%s\", \"materials_link\": \"%s\"}",
                            courseworkId, topic, link
                    );
                }

                // Отправка данных
                try (OutputStream os = connection.getOutputStream()) {
                    byte[] input = jsonInputString.getBytes("utf-8");
                    os.write(input, 0, input.length);
                }

                // Получение ответа
                int responseCode = connection.getResponseCode();

                SwingUtilities.invokeLater(() -> {
                    if (responseCode == HttpURLConnection.HTTP_OK) {
                        System.out.println("Курсовая успешно обновлена в БД через процедуру update_coursework_student");
                    } else {
                        System.out.println("Ошибка при обновлении курсовой. Код: " + responseCode);
                    }
                });

                connection.disconnect();

            } catch (Exception ex) {
                SwingUtilities.invokeLater(() -> {
                    System.err.println("Ошибка при обновлении курсовой: " + ex.getMessage());
                });
                ex.printStackTrace();
            }
        }).start();
    }

    private void sendDeleteCourseworkRequest(int courseworkId) {
        new Thread(() -> {
            try {
                URL url = new URL(DELETE_COURSEWORK_API_URL);
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                connection.setRequestMethod("DELETE");
                connection.setRequestProperty("Content-Type", "application/json");
                connection.setDoOutput(true);

                String jsonInputString = String.format("{\"coursework_id\": %d}", courseworkId);

                try (OutputStream os = connection.getOutputStream()) {
                    byte[] input = jsonInputString.getBytes("utf-8");
                    os.write(input, 0, input.length);
                }

                int responseCode = connection.getResponseCode();

                SwingUtilities.invokeLater(() -> {
                    if (responseCode == HttpURLConnection.HTTP_OK) {
                        System.out.println("Курсовая успешно удалена из БД через процедуру delete_coursework");
                    } else {
                        System.out.println("Ошибка при удалении курсовой. Код: " + responseCode);
                    }
                });

                connection.disconnect();

            } catch (Exception ex) {
                SwingUtilities.invokeLater(() -> {
                    System.err.println("Ошибка при удалении курсовой: " + ex.getMessage());
                });
                ex.printStackTrace();
            }
        }).start();
    }

    // ==================== ДОПОЛНИТЕЛЬНЫЙ МЕТОД ДЛЯ ОБРАБОТКИ JSON ====================

    private void sendGetCourseworksRequest() {
        new Thread(() -> {
            try {
                URL url = new URL(GET_COURSEWORKS_API_URL);
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                connection.setRequestMethod("GET");

                int responseCode = connection.getResponseCode();

                if (responseCode == HttpURLConnection.HTTP_OK) {
                    BufferedReader in = new BufferedReader(
                            new InputStreamReader(connection.getInputStream()));
                    StringBuilder response = new StringBuilder();
                    String inputLine;

                    while ((inputLine = in.readLine()) != null) {
                        response.append(inputLine);
                    }
                    in.close();

                    // Выводим ответ в консоль для отладки
                    System.out.println("Ответ от сервера: " + response.toString());

                    // parseCourseworksFromJSON(response.toString());
                }

                connection.disconnect();

            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }).start();
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new student_frame());
    }
}